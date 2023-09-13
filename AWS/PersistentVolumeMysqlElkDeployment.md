Dashboard -> EC2 -> EC2 Dashboard -> Instances(running) -> Launch instances -> name(old-1), ubuntu, instance type(t2.micro) -> Key pair(processed without  a key pair) -> Network settings -> network, subnet(default subnet), auto-assign
public ip -> Configure storage -> Add new volume 20GB -> launch instances


Dashboard -> EC2 -> EC2 Dashboard -> Instances(running) -> Launch instances -> name(new-1), ubuntu, instance type(t2.micro) -> Key pair(processed without  a key pair) -> launch instances (কোন extra storage দিব না)


![Screenshot from 2023-09-13 19-51-20](https://github.com/Mohsem35/DevOps/assets/58659448/35bcb06d-12d6-4955-bf6e-ab6be9fb5c83)

Step 1: install docker on both vms

[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

Verify that the Docker Engine installation is successful by running the hello-world image.

```
$ sudo service docker start
$ sudo docker run hello-world
```


Step 2: Mount 20GB volume to old-1 vm. run commands in old-1 vm

find out the storages first
```
lsblk
pwd
mkdir mydata 
```

```
sudo mount /dev/xvdb /home/ubuntu/mydata/
```
- error show korbe, karon ami jei storage ta add korte chacchi sei storage tar moddhe kono dhoroner filesystem nai

- check korte hobe, filesystem eikhane actually ache kina. nicher command diye check korbo
```
sudo file -s /dev/xvdb
```
tate dekhabe filesystem banano nai, tahole age file system banai cholen

```
sudo mkfs -t xfs /dev/xvdb
```
filesystem banano hoye gelo. now check again and mount now

```
sudo file -s /dev/xvdb
```
```
sudo mount /dev/xvdb /home/ubuntu/mydata/
```


Step 3: Create docker compose file in old-vm1 home directory

```
vim docker-compose.yml
```

```
version: "3"

services:
  mysql:
    image: mysql:latest
    container_name: db
    environment:
      MYSQL_ROOT_PASSWORD: a
      MYSQL_DATABASE: db
      MYSQL_USER: a
      MYSQL_PASSWORD: a
    volumes:
      - ./mydata:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always
```
```
sudo docker-compose up
```
ekta teminal stick hoye ache jehetu docker run hoiche

- ekhon arekta terminal launch kori of oldvm1
jehetu amra vm te atkai gechi, tahole amra tmux use korte pari

[Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com/)


Step 4: Access the docker container

```
sudo docker exec -it db bash
```
```
mysql -u root -p
```
ekhon ami container theke mysql er vitore dukhe gechi


Step 5: Populate the database

```
code for mysql
creating a table
CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT
);

adding dummy data
INSERT INTO person (name, age) VALUES
('John Doe', 30),
('Jane Smith', 25),
('Bob Johnson', 40),
('Alice Brown', 35),
('Eva Davis', 28);
```

```
show databases;
use db;
show tables;
```

```
exit
```

ekhon check kori amar mydata folder e kichu ache kina. giya dekhbo onek kichu ache seikhane


Step 6: Security group enbale kore dite hobe

old instance e dukhbo -> securoty group -> edit inbound rules -> ssh dewa ache, http dewa nai -> all tcp, CIDR 0.0.0.0/0 -> save rules

ekhon vm-new1 theke telenet korbo oldvm-1 ke public ip dhore

```
telnet <old_vm_public_ip> 3306
```
dekhbo connect hoye geche


amader volume gulo kothay ache ta jodi dekhte chai, ec2 dashboar left side bar -> elastic block store -> volumes -> seikhane 20GB block storage dekhte pabo. state dewa `in use` mane currently they are connected correctly. `available`
mane je keu use korte parbe kintu attache nai

