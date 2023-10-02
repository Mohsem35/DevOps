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
4. [Deubugging](#deubugging)

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

#### Dubugging

- **`Debugging`** docker container
```
docker exec -it <container_id> /bin/bash
```
- **`Debugging`** docker container as **`root user`**
```
docker exec -u 0 -it <container_id> /bin/bash
```

### Dockerfile

RUN: container এর ভিতরে কোন command execute করতে হইলে আমরা `RUN` use করব

WORKDIR: WORKDIR instruction is used to set the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it in the Dockerfile. It essentially changes the current directory within the container where subsequent commands will be executed.

CMD ["node", "index.js"]
CMD ["npm", "run start"]

- Dockerfile এ যা যা লিখতেছি, প্রতিটা line হল docker এর জন্য এক একটা layer.
- Dockerfile এর যত উপরের layer তে change করব, তার নিচের সব layer আবার rebuild হবে
-  

যেই directory তে Dockerfile টা আছে, run the following command to that directory 

Find error
```
# directory তে কি কি আছে সেইটা আমি দেখতে পাচ্ছি 
RUN ls -la && sleep 24000 
```
docker build .

```


