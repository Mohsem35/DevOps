### Facts

- Containers are **`layers of image`**
- Containers are _not meant to host an operating system_. A container only _lives as long_ as the **`process`** inside it is **`alive`**
- Containers are **`running environment`** for a image
- Application image _on top of the base image_
- Docker **`virtualizes the application layer`**


### Docker Commands

- Run container in **`detached/background`** mood
```
# in background mood, we can use console
docker run -d <image_name>:<tag>
```

- **`Attach`** the **`running`** container 

```
docker attach <container_id>
```

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
- **`Attach forever`** container **`with host`**
```
docker update --restart unless-stopped <container_id>
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

- Host **`port binding`** with container port
```
docker run -p <host_port>:<container_port> <image_name>:<tag>
docker run -p 6000:6379 redis:latest
```  
