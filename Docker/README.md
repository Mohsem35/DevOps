### Facts

- Containers are **`layers of image`**
- Containers are _not meant to host an operating system_. A container only _lives as long_ as the **`process`** inside it is **`alive`**
- Containers are **`running environment`** for a image
- Application image _on top of the base image_
- Docker **`virtualizes the application layer`**


### Docker Commands

1. [Basic Commands](#basic-commands)
2. [Attaching container with port commands](#attaching-container-with-port-commands)
3. [Image commands](#image-commands)
4. [Debugging](#debugging)
5. [Docker Volumes](#docker-volumes)
6. [Docker Network](#docker-network)
7. [Dockerfile](#dockerfile)
8. [Docker Multi-stage Builds](#docker-multi-stage-builds)

#### Basic Commands

- Stop a container 
```
# stop a container will delete that container
docker stop <container_id>
```

- Start a container 
```
docker start <container_id>
```
- Running & stopping container list 
```
docker ps -a
```
- Docker **`engine info`** in host
```
docker info
```

- Remove a stopped container
```
docker rm <container_id>
```
- **`Remove`** all **`stopped`** container
```
# removing container will make space free
docker rm prune
```

- **`Pull`** image + **`Start`** container  

```
docker run <image_name>
```
#### Advanced commands

- Container **`logs`**
```
docker logs <container_id>
```
- Give the **`specific name`** of the **`container`**
```
docker run -d -p <host_port>:<container_port> --name <container_specific_name> <image_name>:<tag>
docker run -d -p 6000:6379 --name redis-older redis:latest
```

#### Docker Network

- Docker network **`list`**
```
docker network ls
```
- Network **`creation`** in docker 
```
docker network create \
    --driver bridge \
    --subnet 182.18.0.0/16 \
    <network_name>

docker network create mongo-network
```



#### Attaching container with port commands

- Run container in **`detached/background`** mood
```
# in background mood, we can use console
docker run -d <image_name>:<tag>
```

- **`Attach`** the **`running`** container 

```
docker attach <container_id>
```

- **`Attach forever`** container **`with host`**
```
docker update --restart unless-stopped <container_id>
```


- Host **`port binding`** with container port
```
docker run -p <host_port>:<container_port> <image_name>:<tag>
docker run -p 6000:6379 redis:latest
```  

- **`Access`** docker application **`from browser`**
- **`host_machine_port`** must have to be **`unique`**,but _container_port can be duplicate_
```
# from browser
http://<host_IP>:<attached_host_port>
```
![docker-port-mapping](https://github.com/Mohsem35/DevOps/assets/58659448/a4c657b6-c585-4d9a-8733-3f882bffbf66)

> **_NOTE:_**  All traffic on _host_port_ will be routed to docker _container_port_


#### Image commands

- Docker **`images list`**
```
docker images
```

- **`Remove image`** that is **`no longer needed`**
```
# make sure no containers are running off of that image
# you must stop and delete all dependent containers to be able to delete an image
docker rmi <image_id>
```

- **`How`** image created
```
docker history <image_id>
```

- How many **`resources`** docker container has been **`used`**
```
docker system df -v
```

#### Debugging

- **`Debugging`** docker container
```
docker exec -it <container_id> /bin/bash
```
- **`Debugging`** docker container as **`root user`**
```
docker exec -u 0 -it <container_id> /bin/bash
```

- **`Inspect`** docker container
```
docker inspect <container_id>
```

### Dockerfile

- Dockerfile যতবার **`change`** করব, ততবার **`docker build`** করতে হয়

**`RUN`**: container এর ভিতরে কোন command execute করতে হইলে আমরা `RUN` use করব

**`WORKDIR`**: WORKDIR instruction is used to set the working directory for any _RUN_, _CMD_, _ENTRYPOINT_, _COPY_, and _ADD_ instructions that follow it in the Dockerfile. It essentially _changes the current directory within the container_ where subsequent commands will be executed.

- _working directory_ আমরা **`root থেকে count করব`**, নাহলে directory থেকে বের হয়ে যাবে  

```
WORKDIR /app/api-service/
```

Example of node dockerfile 

```
# Use the official Node.js image as the base image
FROM node

# Set environment variables for MongoDB
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Create a directory inside the container
RUN mkdir -p /home/app

# Copy the contents of the current directory into the container at /home/app
COPY . /home/app

# Define the command to run when the container starts
CMD ["node", "server.js"]
```

- Dockerfile এ যা যা লিখতেছি, **`প্রতিটা line`** হল docker এর জন্য এক একটা **`layer`**
- Dockerfile এর যত উপরের layer তে change করব, তার নিচের সব **`layer rebuild`** আবার হবে, তাই আমরা cache এর benefits টা নিতে পারব না
- In Dockerfile, First we have to **`clone code from git`**. Then, we will install `npm insall`. Cause npm will install the project required dependencies after cloning the project 

> **_NOTE:_**  যেই code গুলো frequently change হবে, সেগুলি Dockerfile এর নিচের layer তে রাখব। উপড়ের দিকে থাকে _apt update, curl, net-tools_ installation এইসব 


- Run the Dockerfile

```
docker build -t <custom_image_name>:<custome_tag_name> <location_of_docker_file>
```

- **`Set env variables`** in container
```
docker run -e <set_variable_value> <image_name>

docker run -e APP_COLOR=blue simple-webapp-color
```



Find errors about directory 
```
# directory তে কি কি আছে সেইটা আমি দেখতে পাচ্ছি 
RUN ls -la && sleep 24000 
```

#### How to clone git repository project and work within in Dockerfile

```Dockerfile
# for nodejs project
RUN apt-get update
RUN apt-get install nodejs-y

RUN apt-get install git -y

RUN git clone https://<project_link>
WORKDIR /app/api-service/
RUN git checkout <git_branch_name>      
WORKDIR /app/api-service/api

RUN npm install 
```
![Untitled-2023-10-03-1938](https://github.com/Mohsem35/DevOps/assets/58659448/2dd3a8d0-2feb-4d52-88de-16383bb8d433)

যখনি আমরা _image থেকে container তে যাব_ তখন following part **`execute`** হবে 

```
CMD ["node", "index.js"]
```

- _গিট clone করার পরে, branch তে গিয়ে checkout করতে হবে_। নাইলে desired directory তে আমরা enter করতে পারব না
- checkout করার পরে, আমরা api directory এত ঢুকতে পারব, এবং সেখানে _index, json ফাইলগুলি দেখতে পাব_
- `npm install` না করলে, `node_modules` টা আসবে না

command override করতে চাইলে `CMD + ENTRYPOINT` এর combination use করা যাইতে পারে

#### CMD vs ENTRYPOINT

```
CMD ["sleep","5"]

# sleep=command, 5=parameter
```
1. When specifying a CMD in **`JSON array format`**, the **`1st element`** of the array should be **`executable`**. `"sleep"` is the executable format
2. Commands and parameters should be **`separate`** elements
3. CMD is _hard coded_
4. While running the container, we **`don’t have to pass any argument`** like

~~docker run <image_name> sleep 5~~

ENTRYPOINT 
```
["sleep"]
```
1. Just declare the command
2. We have to **`pass the parameter value/argument`** while run the container like
```
docker run <image_name> 10
```
3. If you **`don’t pass`** the value while running the container, **`error`** will be occured


```dockerfile
FROM ubuntu:22.04

CMD ["echo", "default print"]    # default command

ENTRYPOINT ["echo"]              # default command with arguments
```
```
docker build -t <custom_image_name>:<custome_tag_name> .
docker run <custom_image_name> "hey, hello"
```
`ENTRYPOINT` Dockerfile এ যা কিছু আছে তা show করবে, সাথে `Hey, hello` print করবে additionally


### 


### Docker Multi-stage Builds

Docker multi-stage builds are a _feature in Docker_ that allow you to create **`more efficient and smaller Docker images`** by using **`multiple build stages within a single Dockerfile`**. This feature is particularly useful when building _complex applications or services that require various build tools and dependencies during the build process_ but do not need all of them in the final runtime image.


```Dockerfile
# Build Stage 1: Use a Node.js development environment to build the app
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build Stage 2: Use a lightweight Node.js runtime environment
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "./dist/server.js"]
```

- stage-1 name = **`builder`**
- এর মানে হচ্ছে, stage-1 তে যা যা build হইছে তার `/app/dist` directory থেকে সবকিছু copy করে stage-2 এর `./dist` তে রাখবে
- Final stage এর os alpine use করার try করব। কিন্তু PRISMA like applications develope করতে গেলে base image alpine os নেওয়ার পরে, যা যা os buindings লাগবে for running the PRISMA app, সেইগুলি আলাদা করে install করে নিতে হবে
```Dockerfile
FROM node:20-alpine
RUN apk add <package_name>
```  
- Final যেই stage, সেইটাই আমরা docker hub তে push করব। cause, for it's optimization


#### Docker Volumes

- **`Create`** docker volume manually 
```
docker volume create <data_volume>
```
> **_Note_**: At first create data directory to host machine, then attach the container with that directory 

- Docker volume **`list`**
```
docker volume ls
```
- **`Inspect`** docker volume

```
docker volume <volume_name>
```

##### Docker volume types

1. **`Host Volumes`**: _You decide where on the host_ file system the reference is made
```
docker run -v <host_directory>:<container_directory>

docker run -v /home/mount/data:/var/lib/mysql mysql
```

2. **`Anonymous Volumes`**: For each container a folder is generated in host machine and _Docker takes care itself_
```
docker run -v <container_directory>

docker run -v /var/lib/mysql/data
```

3. **`Named Volumes`**: You can reference the volume by name. **`Should be used in production`**

```
docker run -v <name>:/var/lib/mysql/data

docker run --name <conatiner_name> -p 5432:5432 -v <volume_name>:/var/lib/postgresql/data <image_name>:<tag>

docker run --name pg -p 5432:5432 -v postgres:/var/lib/postgresql/data postgres:14
```


### Docker Compose

- **`docker-compose`** is **`not installed by default`** with docker engine.
- Create a file named _docker-compose.yml_ and **`make individual image of every application`**(using dockerfile) and give them specific name

```
version: '3'                        # Specifies the Docker Compose version being used.

services:
  mongodb:
    image: mongo:latest          # Uses the latest version of the MongoDB Docker image.
    ports:
      - 27017:27017          # Maps the host's port 27017 to the container's port 27017.
    volumes:
      - mongo-data:/data/db  # Mounts a volume named 'mongo-data' to '/data/db' in the container.

  db:
    image: postgres         # Uses the latest version of the PostgreSQL Docker image.
    restart: always         # Ensures the container restarts automatically.
    environment:
      POSTGRES_USER: example        # Sets the PostgreSQL username to 'example'.
      POSTGRES_PASSWORD: example    # Sets the PostgreSQL password to 'example'.

volumes:
  mongo-data:
    driver: local           # Defines a named volume 'mongo-data' with the local driver.

```

> **_Note_**: if image is not present in public docker hub, just replace image tag with build tag and declare the directory where the application code and DOCKERFILE with instructions to build the docker image is located 