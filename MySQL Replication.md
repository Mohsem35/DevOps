```
docker run -d --name master -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=mydb mysql:8.0-debian 
docker run -d --name slave -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=mydb mysql:8.0-debian
```
```
# in master
CREATE USER 'repl'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

# To complete(lock previlege) the execution
FLUSH PRIVILEGES;
FLUSH TABLES WITH READ LOCK;
SHOW MASTER STATUS;
```

state-machine কি জিনিষ ? 

10 > 5 > 7

- database একটা state-machine এর মত। সে state wise চিন্তা করে, আগের state এ কি ছিল, পরের state এ কি হইছে। এই **`state change`** হওয়ার বিষয়টা **`binlog`** এর মধ্যে save হয়। 



```
# in slave
CHANGE MASTER TO MASTER_HOST='[master_ip]', MASTER_USER= 'repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='[log_file_from_master]', MASTER_LOG_POS=[log_position_from_master];
START SLAVE;

CHANGE MASTER TO MASTER_HOST='172.17.0.2', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=857;
```
```
# in master
mysql> show databases;
mysql> use mydb;

mysql> CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

# for debugging
mysql> SHOW MASTER STATUS;
or
mysql> SHOW SLAVE STATUS;
```

```
# in slave
mysql> stop slave;
```

```
# in master
# secure communication করার জন্য native password তে convert করতে হয়
mysql> ALTER USER 'repl'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'password';
mysql> FLUSH PRIVILEGES;
```
```
# in slave
mysql> start slave;
```

```
mysql> SHOW SLAVE STATUS;

# error
Fatal error: The slave I/O thread stops because master and slave have equal MySQL server ids; these ids must
be different for replication to work (or the --replicate-same-server-id option must be used on
slave but this does not always make sense; please check the manual before using it).
```
2 টা mysql same configuration এ run হইছে, কেননা image same। তাই mysql server ২ টা ধরে নিছে তারা same host. configuration ফাইলে different server ID বাসাইতে হবে

```
# On the master container
docker exec -it [master_container_name] bash
mysql -u root -p [root_password]
```
```
# Inside MySQL shell on master, create a test table and insert data USE mydb;
CREATE TABLE test (id INT AUTO_INCREMENT PRIMARY KEY, data VARCHAR(255)); INSERT INTO test (data) VALUES ('Hello, Master!');
```
```
# On the slave container
docker exec -it [slave_container_name] bash
mysql -u root -p [root_password]
```
```
# Inside MySQL shell on slave, check if data is replicated
USE [database_name];
SELECT * FROM test;
```
