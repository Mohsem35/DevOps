AWS region: us-east-1

Step 1: Create VPC

- private subnet এর instances গুলো update করার জন্য internet access লাগবে, তার মানে এখানে `NAT gateway` লাগবে
- AWS এর `services` and `instances` গুলো নিজেরদের মধ্যে communicate করার জন্য **`vpc endpoints`** use করে, এতে **`bill কম আসবে`**। এই একই কাজটা public internet এর throough তে
  করতে গেলে NAT gateway use করতে হইত, তখন bill অনেক বেশি আসত
- AWS এর সার্ভিস use করতে গেলে `vpc endpoints` লাগবেই


search `vpc` in search box -> VPCs -> create vpc -> resources to create(`vpc and more`), name tag auto-generation(`fullstack`), ipv4 cidr block(`10.0.0.0/16`), 
number of availability zones(`2`), number of public subnets(`2`), number of private subnets(`2`), nat gateways(`In 1 AZ`), vpc endpoints(`none`) -> create vpc



Dashboard -> EC2 -> EC2 Dashboard -> click on instances(running) -> click on `launch instances` -> name and tags(`lb-1`) -> application and os images(`ubuntu`)
-> instance type(`t2.micro`) -> Key pair(`processed without  a key pair`) -> network settings -> vpc(`fullstack-vpc`), subnet(`fullstack-subnet-public1-us-east-1a`), tick `allow ssh traffic from`, `allow https traffic from the internet`, `allow http traffic from the internet`, auto-assign public ip(enable) -> launch instances

```
sudo apt update -y
sudo apt install nginx -y
sudo systemctl status nginx  
```

total 5 ta instance lagbe

Dashboard -> EC2 -> EC2 Dashboard -> click on instances(running) -> click on `launch instances` -> name and tags(`fe-1`) -> -> application and os images(`ubuntu`)
-> instance type(`t2.micro`) -> Key pair(`create new key pair`), key pair name(`sshkey`), key pair type(`rsa`), private key file format(`.pem`) -> network settings -> vpc(`fullstack-vpc`), subnet(`fullstack-subnet-private2-us-east-1b`), tick `allow ssh traffic from`, `allow https traffic from the internet`, `allow http traffic from the internet`, auto-assign public ip(enable) -> launch instance

3 ta instance eksathe banabo, pore name change korbo
while creating instance, right side summary te number of instances = 3
, uporer `fe-1` er motoi sob configuration, subnet(`fullstack-subnet-private1-us-east-1a`) -> launch instance

name change kortechi ekhon
![Screenshot from 2023-09-21 18-29-02](https://github.com/Mohsem35/DevOps/assets/58659448/fff57cb5-2ccb-4349-8027-86fc34ffc6c1)

AWS `auto-scaling group` e health check er options ache. EC2 dashboard -> auto scaling groups

lb-1 theke fe-1 te ssh korar try kori. ei commands gulo lb-1 te run korbo

```
vim sshkey.pem
paste the .pem file context while creating fe-1 instance

# now change the access config key
chmod 400 sshkey.pem

ssh -i sshkey.pem ubuntu<fe-1_private_ip>
```

ekhon fe-1 te ekta react application install korbo. NAT gateway er through te fe-1 instance package gulo install korbe. mane outbound request allowed kintu inbound allowed na

```
# in fe-1
install node version 18
gcp te jeivabe nodejs ar corepack install korechilam oi vabe 2 ta korbo
pnpm -v
pnpm create vite
project name: vite-project
framework: react
variant: typescript + swc
cd vite-project/
pnpm install
pnpm run dev
pnpm build
pnpm review
# port defined kore dibo
sudo pnpm preview --host --port 80
```

```
# in lb-1
telnet <fe-1_private_ip> 80
curl <fe-1_private_ip> 80


sudo vim /etc/nginx/nginx.conf

# nginx code in lb-1
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
        server <frontend_vm_private-ip>:80;
    }
}
```



```
# in be-1 168
install node js
same steps from gcp
```


```
# in be-1 115
install node js
```

```
# in lb-1 te
sudo vim /etc/hosts
<lb-1-private-ip> example.com
<lb-1-private-ip> api.example.com


```


```
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://frontend;
  }
}

server {
  listen 80;
  server_name api.example.com;

  location / {
    proxy_pass http://backend;
  }
}
```

```
# in fe-1
cd vite-project/src

vim App.tsx
paste code from chat gpt
pnpm add axios
pnpm build
sudo pnpm preview --host --port 80

```

gcp te nat gateway nai, ora use kore `identity aware proxy`


run the following commands in fe-1 instance


আমরা প্রথমে frontend কে hit করতেছি from browser, frontend থেকে একটা payload আসে browser তে। তখন browser সেই payload টা পড়ে। পড়ার পরে browser যখন বুঝে তাকে backend তে hit 
করতে হবে, তখন browser থেকে request টা যায় backend এ 
