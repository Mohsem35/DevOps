Read/Write query segregate nginx করতে পারে না, তাই database replication তে nginx কাজে দিবে না। তার জন্য লাগবে **`proxysql`**

will help to understand proxy or load balancer

Nginx use cases:

1. Load balancer

load balancer are 2 types
- L4: Transport layer এ কাজ করে
- L7: HTTP layer

2. Reverse proxy
3. Web server: caching(netflix) configuration করা possible

#### Key Files

`/etc/nginx/conf.d`

`/etc/nginx/nginx.conf` is the default(root) nginx configuration file

- nginx যখন request গুলো deliver করে, তখন nginx **`multiple worker process`** launch করে

`/var/log/nginx/error.lof` directory is reposnsible for _access.log & error.log_


```
nginx -h        # for help
nginx -v        # nginx version
nginx -t        # test current configuration file
nginx -s reload    # reload nginx configuration
```
nginx.conf ফাইলে একটা করে line লিখব, একবার করে check দিব 

#### Serving Static Content

`/etc/nginx/conf.d/default.conf`

- there will be a **`{server}`** block, where all the configurations will be declared for individual domain name. **`except`** হচ্ছে যেকোন server block
- nginx একটা worker process launce করে দিছে, যেইটা 80 port listen করতেছে। মানে 80 port এ কোন request আসলে সেই worker process কোন কাজ করবে
- server block এর ভিতরে **`location`** আরেকটা block
```
server {
  listen 80 default-server:

  server_name www........com;
  location / {
    root /usr/share/nginx/html        # static html location directory
    index index.html                  # index is a directive(static html file)
  }
}
```
- **`server_name`** is the host name. **`host header`**
- linux directives are instructions. like **`listen`** is a nginx directive where nginx tells where to listen
- semicolon(;) after each statement


### HTTP load balancing configuration (L7)

#### Stateless

**`HTTP header`**, Path header গুলো নিয়ে কাজ করে 

In the context of Nginx, **`upstream`** refers to a configuration **`block`** that defines a **`group of servers`** that can handle requests together. These servers are typically used to **`distribute the load`** among them or to provide failover support

**`proxy_pass`** is a **`directive`** in Nginx used to instruct the server to **`pass client requests`** to a specified backend server

- user **`downstream`** এ থাকে, upstream  এ থাকে server গুলো 

```
# backend is the name of the upstream group
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
}


location / {
    proxy_pass http://backend;
}
```

![Untitled-2023-10-14-1836](https://github.com/Mohsem35/DevOps/assets/58659448/530e1d30-7642-45c5-84db-f202c6311783)

Common question in DevOps: HTTPS টা  terminate করতেছি কোথায় ? 


### TCP load balancing (L4)


#### Stateful

- TCP load balancer শুধুমাত্র port দেখে. কোন server এর **`কোন port`** এ connect হইতে হবে, সে শুধুমাত্র সেই কাজটাই করবে 
- database load balancing এর ব্যাপার আসলে TCP load balancing লাগবে, cause database তে কোন http endpoint নাই। তারমানে L7 load-balancing possible না এইখানে 

![Untitled-2023-10-14-1836](https://github.com/Mohsem35/DevOps/assets/58659448/0c55871a-9baa-4232-a649-c04bdb03f37b)

```
# wraping
stream {

  upstream mysql-backend {

    }
}
```

user requests -> TCP load balancer -> creates **`tunnel`** for TCP connection -> sends **`HTTPS`** requests to nginx servers

![Untitled-2023-10-14-1836](https://github.com/Mohsem35/DevOps/assets/58659448/cd9fe36d-6833-4aa5-8b97-3d1f3d5d99da)


### Health check directory in nginx

backend server ঠিক আছে নাকি failure করছে তা চেক করার জন্য  

In Nginx, a health check is a **`mechanism`** used to **`periodically verify the status(like ping continuously)`** or availability of backend servers. This is crucial for ensuring that Nginx only forwards client requests to servers that are currently operational and capable of handling the requests

```
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    check interval=3000 rise=2 fall=3 timeout=1000;
}
```
check **`interval=3000 rise=2 fall=3 timeout=1000`** configures the health check parameters. This means that _checks will be performed every 3000 milliseconds_, a server will be marked as _"up" after 2 successful checks_, and it will be marked as _"down" after 3 consecutive failures_. The timeout for each check is set to 1000 milliseconds.
