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
      - ./mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always
```
```
sudo docker compose up
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

Now, check the `mysql_data` directory if anything exists. We should see MySQL configuration files


#### Step 6: Enable `security group` for accessing the `ec2-old-1` instance

Dashboard -> `EC2` -> EC2 Dashboard -> click on `instances(running)` -> click on the instance id of `ec2-old-1` -> security tab -> security groups -> click on the `sg.....` -> click on `edit inbound rules` -> ssh is OK, http দেয়া নাই
-> click `add rule` -> Type (`all tcp`), Source(`Anywhere-IPv4`), CIDR (`0.0.0.0/0`) -> save rules

এখন `ec2-new-1` instance থেকে telenet করব `ec2-old-1` instance কে public ip ধরে

```
telnet <ec2-old-1_public_ip> 3306
```
We will see that `ec2-old-1 connects `ec2-old-1` simply


#### Step 7: Detach volume and add the volume to the `ec2-new-1` instance


If we want to see our `Elastic Block Storage (EBS) volumes`:


EC2 dashboard left sidebar -> elastic block store -> click on `volumes` -> we will see 20GB block EBS, type(`gp3`), size(`20GiB`) 

volume state:

- **`In-use`**: means EBS is attached to instance
- **`Available`**: means the EBS is not attached and free for use

Now detach the 20GB volume from the `ec2-old-1` instance and 

EC2 dashboard left sidebar -> elastic block store -> click on `volumes` -> tick on the 20GiB volume -> `actions` -> detach volume -> detach

![Screenshot from 2023-09-19 19-58-11](https://github.com/Mohsem35/DevOps/assets/58659448/02954168-5d1b-4ae3-8f61-a29cc38b74ab)

![Screenshot from 2023-09-19 20-00-39](https://github.com/Mohsem35/DevOps/assets/58659448/75c5329c-7fda-4f4e-b859-36b5ab640f0a)


Now, attach the volume to the `ec2-new-1`

EC2 dashboard left sidebar -> elastic block store -> click on `volumes` -> tick on the 20GiB volume -> `actions` -> attach volume -> instance(`ec2-new-1`), device name(`/dev/sdf`) -> attach volume

![Screenshot from 2023-09-19 20-03-50](https://github.com/Mohsem35/DevOps/assets/58659448/baa6aab7-ab86-4edc-a7b1-036ab8fc7f3b)

- তার মানে `ec2-new-1` এর সাথে আমরা 20 GB attach volume attach করলাম, যেইটা deattach করছিলাম from `ec2-old-1`
- মাত্র attach করলাম, এখন আগের মত mount করতে হবে

Run the following commands in `ec2-new-1`

```
lsblk
```
<img width="650" alt="Screenshot 2023-09-18 at 6 49 15 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d3385412-0048-4ea6-9279-fa4a88616b58">

```
sudo file -s /dev/xvdf
```

```
mkdir another_folder
cd another_folder
```

যেহেতু filesystem পাওয়া গেছে, মাঝের 2 টা step skip করব

```
sudo mount /dev/xvdf /home/ubuntu/another_folder
ls
```

MySQL এর যা যা file and information ছিল, সব আমরা retrive করতে পেরেছি 

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

Run the follwing commands in `ec2-new-1`

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


### ELK Deployment Docker File


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

- To complete the task, `elastic search sdk` লাগবে
- ELK তে data insert করার জন্য age indexing করতে হয়
 
