
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


### HTTP load balancing

