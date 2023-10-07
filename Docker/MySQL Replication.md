## MySQL replication through containers

```
mkdir mysql-replication
```

#### Setup master server

Create a directory where all the master server's configuration files will be located

```
mkdir /mysql-replication/master
```

Now, create these 2 files inside the master directory 
- **`master_mysql.cnf`**
- **`mysql_master.env`**

```
# master_mysql.cnf

[mysqld]
skip-name-resolve
default_authentication_plugin = mysql_native_password

server-id = 1
log_bin = 1
binlog_format = ROW
binlog_do_db = mydb
```
- _secure communication_ করার জন্য **`native password`** তে convert করতে হয়

```
# mysql_master.env

MYSQL_ROOT_PASSWORD=111
MYSQL_PORT=3306
MYSQL_USER=maly
MYSQL_PASSWORD=maly123
MYSQL_DATABASE=mydb
MYSQL_LOWER_CASE_TABLE_NAMES=0
```

#### Setup slave server


```
mkdir /mysql-replication/slave
```

Now, create these 2 files inside slave directory 
- **`slave_mysql.cnf`**
- **`mysql_slave.env`**



```
# mysql_slave.env

MYSQL_ROOT_PASSWORD=111
MYSQL_PORT=3306
MYSQL_USER=tuhin
MYSQL_PASSWORD=tuhin123
MYSQL_DATABASE=mydb
MYSQL_LOWER_CASE_TABLE_NAMES=0
```

```
# slave_mysql.cnf

[mysqld]
skip-name-resolve
default_authentication_plugin = mysql_native_password

server-id = 2
log_bin = 1
binlog_do_db = mydb
```

```
vim /mysql-replication/docker-compose.yml
```


```yml
version: '3'
services:
  mysql_master:
    image: mysql:8.0
    env_file:
      - ./master/mysql_master.env
    container_name: "mysql_master"
    restart: "no"
    ports:
      - 4406:3306
    volumes:
      - ./master/master_mysql.cnf:/etc/mysql/conf.d/mysql.conf.cnf
      - ./master/data:/var/lib/mysql
    networks:
      - overlay

  mysql_slave:
    image: mysql:8.0
    env_file:
      - ./slave/mysql_slave.env
    container_name: "mysql_slave"
    restart: "no"
    ports:
      - 5506:3306
    depends_on:
      - mysql_master
    volumes:
      - ./slave/slave_mysql.cnf:/etc/mysql/conf.d/mysql.conf.cnf
      - ./slave/data:/var/lib/mysql
    networks:
      - overlay

networks:
  overlay:
```
#### Run docker-cmpose file

```
cd ~/mysql-replication
sudo docker compose up -d
```

#### Setup master mysql server for replication

```
sudo docker ps 
docker inspect <master_container_name> | grep IPAddress
docker exec -it <master_container_name> -u root -p
```
```
# mysql configuration at master_container
apt update -y
mysql --version


mysql> SHOW DATABASES;
mysql> CREATE USER 'repl'@'%' IDENTIFIED BY 'password';   # user 'repl' can connect from any host ('%')
mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';     # grants REPLICATION SLAVE privilege on all databases and tables (*.*) to user 'repl' from any host ('%')
mysql> FLUSH PRIVILEGES;                                # to complete(lock privilege) the execution
mysql> SHOW MASTER STATUS;
```
```
+----------+----------+--------------+------------------+-------------------+
| File     | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------------------------+------------------+-------------------+
| 1.000003 | 827      |   mydb       |                  |                   |
+----------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```




One significant feature introduced in version 3.8 is the ability to define resources like memory and CPU constraints at the service level. This allows you to specify how much memory or CPU a service should be allowed to use, which can be crucial in resource-constrained environments.

In general, if you have the option to use version 3.8, it's recommended to do so, especially for more complex applications where fine-grained control over resources and other advanced features might be beneficial. However, if you're working on a simple project or you need to maintain compatibility with older systems, version 3 may still be sufficient.



- In MySQL, the **`binary log`** (often referred to as the "binlog") is a transaction log that contains a **`record of all changes`** to the database's data. database একটা state-machine এর মত। সে state wise চিন্তা করে, আগের state (10 > 5 > 7)এ কি ছিল, পরের state এ কি হইছে। এই **`state change`** হওয়ার বিষয়টা **`binlog`** এর মধ্যে save হয়। 


#### Setup slave mysql server for replication



```
sudo docker ps 
docker inspect <slave_container_name> | grep IPAddress
docker exec -it <slave_container_name> -u root -p

# mysql configuration at slave_container
apt update -y
mysql --version

mysql> SHOW DATABASES;

# connect to master
mysql> CHANGE MASTER TO MASTER_HOST='mysql_master', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=857;
mysql> START SLAVE;
```

- In this example, the host name of master is `mysql_master` (_name of the docker container_) which will be automatically resolved to master's IP, the log file is `1.000003` and the log position is `827`.\

> **_Note_:** we used master as the hostname because we are using _docker-compose and the containers are on the same network_.


#### Testing replication


```
sudo docker exec -it <master_container_name> -u root -p

mysql> SHOW DATABASES;
mysql> USE mydb;
mysql> SHOW tables;

mysql> CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT,
                            username VARCHAR(255),
                            email VARCHAR(255));

mysql> INSERT INTO users (username, email) VALUES ('john_doe', 'john@example.com'), ('jane_doe', 'jane@example.com');
```

```
# Debugging at slave server
mysql> SHOW SLAVE STATUS\G;
mysql> USE mydb;
mysql> SELECT * FROM users;
```

DONE

```
# Some errors 

Fatal error: The replica I/O thread stops because source and replica have equal MySQL server ids; these ids must be
different for replication to work (or the --replicate-same-server-id option must be used on replica but this does not
always make sense; please check the manual before using it).


Solution: MySQL configuration ফাইলে server_id change করতে হবে, master এবং slave ২ জনেরই **`server_id same`** হয়ে গেছে, তাই প্রব্লেম করতেছে 
```