

```
chmod 400 any.pem
```

```
ssh -i any.pem ubuntu@<vm_public_ip>
```
```
sudo apt update -y
sudo apt install nginx -y
```
এখন public_ip টা browser থেকে access করার try করলে nginx server দেখতে পারব
যদি আমরা ঢুকতে না পারি, তারমানে security aceess দেই নাই

instance -> security tab -> security groups -> inbound rules -> edit inboud rules -> add rule -> add http ->  CIDR blocks(0.0.0.0/0) -> save rule

GCP তে key(public-key) টা vm তে add করে দিয়ে আসতে হইত, তারপর আমার পিসি টার্মিনাল থেকে direct access করতে পারতাম। কিন্তু AWS তে key downloand করলেই আমার পিসি টার্মিনাল থেকে direct access করতে পারব

এখন আমি nginx server থেকে আমার private vm((application server) access করতে চাই 

- nginx server vm তে নতুন একটা ফাইল বানাই। নাম দেই any.pem
- আমার pc তে যে key টা download করছিলাম, সেইটা cat করে copy করে nginx server vm এর any.pem ফাইলে paste করি

```
ssh -i any.pem ubuntu@<app-private-ip> -v
```

now update the app vm
```
sudo apt update -y
sudo apt install nginx -y
sudo vim /var/www/html/index.nginx-debian.html
sudo nginx -t
sudo nginx -s reload
```

Now change the configuration file of lb nginx server(public ip)

```
sudo vim /etc/nginx/nginx.conf
```
```
events {
    # empty placeholder
}


http {

    server {
        listen 80;

        location / {
            proxy_pass http://frontend;
        }
    }

    upstream frontend {
        server <frontend_private_ip>:80;
    }
}
```
```
sudo nginx -t
sudo nginx -s reload
```

এখন আমরা browser দিয়ে access করার try করব, কিন্তু কিছু দেখতে পারব না। তার কারণ, app-private-ip-vm তে 80 পোর্ট open করা নাই

app1 -> security tab -> security groups -> edit inbound rules -> http -> 0.0.0.0/0 -> save rule

all done
