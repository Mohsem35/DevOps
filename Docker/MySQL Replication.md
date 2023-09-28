Step 1: Create and configure **`MySQL master database`** docker container

```
docker run -d --name master -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=mydb mysql:8.0-debian 
docker inspect master | grep IPAddress
docker exec -it master mysql -u root -p

# mysql configuration at container
apt update -y
mysql --version


mysql> SHOW DATABASES;
mysql> CREATE USER 'repl'@'%' IDENTIFIED BY 'password';    # creates a user named 'repl' that can connect from any host ('%')
mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';    # grants REPLICATION SLAVE privilege on all databases and tables (*.*) to user 'repl' from any host ('%')
mysql> FLUSH PRIVILEGES;                                # to complete(lock privilege) the execution
mysql> FLUSH TABLES WITH READ LOCK;                    # preventing any write operations (such as INSERT, UPDATE, DELETE) on those tables
mysql> SHOW MASTER STATUS;
```
<img width="548" alt="Screenshot 2023-09-28 at 7 04 08 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/313c4b3f-c3cd-44e5-86ed-b95e8bfdd051">

- In MySQL, the **`binary log`** (often referred to as the "binlog") is a transaction log that contains a **`record of all changes`** to the database's data. database একটা state-machine এর মত। সে state wise চিন্তা করে, আগের state (10 > 5 > 7)এ কি ছিল, পরের state এ কি হইছে। এই **`state change`** হওয়ার বিষয়টা **`binlog`** এর মধ্যে save হয়। 




Step 2: Create and configure **`MySQL slave database`** docker container

```
docker run -d --name slave -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=mydb mysql:8.0-debian
docker inspect slave | grep IPAddress
docker exec -it master mysql -u root -p

# mysql configuration at container
apt update -y
mysql --version

mysql> SHOW DATABASES;

# connect to master
mysql> CHANGE MASTER TO MASTER_HOST='172.17.0.2', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=857;
mysql> START SLAVE;
```

Step 3: **`Populate data`** in master db server and **`debug`** the slave server

```
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

# error
Error connecting to source 'repl@172.17.0.2:3306'. This was attempt 15/86400, with a delay of 60 seconds between attempts. Message: Authentication plugin 'caching_sha2_password' reported error: Authentication requires secure connection.
```
That means replication is not done yet


Step 4: **`Solve issues`** for replication

```
# in slave
mysql> STOP SLAVE;


# in master
# secure communication করার জন্য native password তে convert করতে হয়
mysql> ALTER USER 'repl'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'password';
mysql> FLUSH PRIVILEGES;


# in slave
mysql> START SLAVE;
mysql> SHOW SLAVE STATUS;


# error
Fatal error: The replica I/O thread stops because source and replica have equal MySQL server ids; these ids must be
different for replication to work (or the --replicate-same-server-id option must be used on replica but this does not
always make sense; please check the manual before using it).
```

Solution: MySQL configuration ফাইলে server_id change করতে হবে, master এবং slave ২ জনেরই **`server_id same`** হয়ে গেছে, তাই প্রব্লেম করতেছে 
