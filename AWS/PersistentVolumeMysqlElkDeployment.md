Agenda of today's class:

- Persistent volume show 
- MySQL deployment on EC2
- Elasticsearch deployment on EC2

<img width="800" alt="Screenshot 2023-09-18 at 9 45 51 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/342c6b25-23a4-4625-becd-331167314348">


### EC2 Instance Naming Conventions

Default Pattern Format:

```ec2-RegionCode-AvailabilityZoneCode-EnvironmentCode-ApplicationCode.```

## How can you demonstrate data persistence between two different MySQL databases hosted on two separate EC2 instances using Elastic Block Storage (EBS)?

#### Create 2 EC2 instances 

Dashboard -> `EC2` -> EC2 Dashboard -> click on `instances(running)` -> click on `launch instances` -> name and tags(`ec2-old-1`) -> application and os images(`ubuntu`) -> instance type(`t2.micro`) -> Key pair(`processed without  a key pair`) -> network settings (`default-vpc-network`), subnet(`default subnet`), auto-assign public ip(`enable`) -> configure storage -> click on `add new volume 20GB` -> launch instances


Dashboard -> EC2 -> EC2 Dashboard -> click on `instances(running)` -> click on `launch instances` -> name and tags(`ec2-new-1`) -> application and os images(`ubuntu`) -> instance type(`t2.micro`) -> Key pair(`processed without  a key pair`) -> network settings (`default-vpc-network`), subnet(`default subnet`), auto-assign public ip(`enable`) -> launch instances (কোন extra storage দিব না)


#### Step 1: install docker on both ec2 instances

[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

```
sudo apt update -y
sudo apt -y install net-tools docker.io
```

Verify that the Docker Engine installation is successful by running the hello-world image.

```
sudo service docker start
sudo docker run hello-world
```


#### Step 2: Mount 20GB volume to the `ec2-old-1` instance 

Run the following commands in ec2-old-1. Find out the storage first

```
lsblk
pwd
mkdir mysql_data
```

<img width="500" alt="Screenshot 2023-09-18 at 10 20 43 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e9bb5394-ee3d-4b3d-832e-49d55d23e4a4">

We will see an extra storage of 20GB `xvdb`name

```
sudo mount /dev/xvdb /home/ubuntu/mysql_data/
```

<img width="1440" alt="Screenshot 2023-09-18 at 10 25 39 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/2a488ed1-a97b-42ed-ac54-8769da16d759">

**`Error`** show করবে। আমি যেই extra volume storage(20GB) add করতে চাচ্ছি, সেই storage টার মধ্যে কোন ধরনের **`filesystem নাই`** । Check করতে হবে, filesystem এইখানে actually exist করতেছে কিনা। 

```
# check the file system
sudo file -s /dev/xvdb
```
তাতে দেখাবে filesystem বানানো নাই, তাহলে আগে filesystem বানাতে হবে

```
# create filesystem
sudo mkfs -t xfs /dev/xvdb
```

filesystem বানানো হয়ে গেছে। Now check again and mount now

```
sudo file -s /dev/xvdb
```
<img width="500" alt="Screenshot 2023-09-18 at 10 37 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/774ac532-e932-499e-b9bf-af59d04e496b">

```
cd /home/ubuntu/mysql_data/
sudo mount /dev/xvdb /home/ubuntu/mysql_data/
```
<img width="500" alt="Screenshot 2023-09-18 at 10 40 03 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/7f555936-ef22-4937-b61f-5184ef5fd15d">


#### Step 3: Create a docker-compose file in `ec2-old-1` instance

```
mkdir docker
cd /home/ubuntu/docker
sudo vim docker-compose.yml
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
sudo docker-compose.yml up
```
teminal stuck হয়ে আছে যেহেতু docker run হচ্ছে। now open a new tab for ec2-old-1 instance from the broswer 

solution: আমরা **`tmux`** use করতে for this above problem

[Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com/)


#### Step 4: Access the newly created docker container

```
sudo docker exec -it db bash
```
```
mysql -u root -p
Enter password: a
```
এখানে আমি container থেকে mysql database সার্ভারে access করলাম 

#### Step 5: Populate the database


```
show databases;
use db;
```

```
# code for mysql
# creating a table
CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT
);

# adding dummy data
INSERT INTO person (name, age) VALUES
('John Doe', 30),
('Jane Smith', 25),
('Bob Johnson', 40),
('Alice Brown', 35),
('Eva Davis', 28);
```
```
show tables;
select * from person;
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


ekhon newvm-1 te storage attach korte hobe

volumes page -> actions -> attach volume -> select instance(newvm-1), device name(/dev/sdf) -> attach

tar mane newvm-1 er sathe ami 20 GB attach korlam, age jeita unattach korchilam for oldvm-1 

matro attach korlam, ekhon ager moto mount oisob korbo

run the following commands from newvm-1



```
lsblk
```
<img width="650" alt="Screenshot 2023-09-18 at 6 49 15 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d3385412-0048-4ea6-9279-fa4a88616b58">
jehetu xvdf dekha jacche, sehetu

```
sudo file -s /dev/xvdf
```

```
mkdir another_folder
cd another_folder
```

jehetu file system paiya geche, majher 2 ta step bad dibo

```
sudo mount /dev/xvdf /home/ubuntu/another_folder
ls
```

mysql e ja ja information chilo sob amra retrive kore felchi

```
sudo vim docker-compose.yml
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
      - ./another_folder:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always
```

```
sudo docker compose up
```

then onno browser tab diye newvm-1 open kori

```
sudo docker ps
sudo docker exec -it db bash
mysql -u root -p 
```

```
show databases;
use db;
show tables;
select * from person;
```


ELK


```
version: "3.7"

services:
  elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch: 7.15.0
  container_name: elasticsearch
  environment:
    - node.name=elasticsearch
    - discovery.type=single-node
    - "ES_JAVA_OPTS=-Xmx512m -Xms512m"
  ports:
    - 9200:9200
  networks:
    - elk-network

kibana:
  image: docker.elastic.co/kibana/kibana:7.15.0
  container_name: kibana
  environment:
    - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
  ports:
    - 5601:5601
  networks:
    - elk-network


networks:
  elk-network:
    driver: bridge
```

pura kaj ta korar jonn elastic search sdk ta lagbe

ELK te data insert korar jonno age index korte hoy 
