## Fullstack application deployment AWS


AWS region: us-east-1

### Step 1: Create a VPC where the fullstack application will be deployed

- private subnet এর instances গুলো update করার জন্য internet access লাগবে, তার মানে এখানে `NAT gateway` লাগবে
- AWS এর `services` and `instances` গুলো নিজেরদের মধ্যে communicate করার জন্য **`vpc endpoints`** use করে, এতে **`bill কম আসবে`**। এই একই কাজটা public internet এর     
  through তে করতে গেলে NAT gateway use করতে হইত, তখন bill অনেক বেশি আসত
- AWS এর services গুলো use করতে গেলে `vpc endpoints` লাগবেই
- নিচের ছবি টা ভালভাবে খেয়াল করলে দেখা যাবে যে, **`private subnet`** গুলো internet connection এর জন্য **`fullstack-vpce-s3`** নামের vpc-endpoint use করবে
<img width="800" alt="Screenshot 2023-09-22 at 7 57 45 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/bbed5084-68ed-4c2e-be2a-c13de2589891">



search `vpc` in search box -> `VPCs` -> click on `create vpc` -> vpc settings -> resources to create(`vpc and more`), name tag auto-generation(`fullstack`), ipv4 cidr block(`10.10.0.0/16`), number of availability zones(`2`), number of public subnets(`2`), number of private subnets(`2`), nat gateways(`In 1 AZ`), vpc endpoints(`none`) -> create vpc


### Step 2: Create several ec2 instances for lb, frontend and backend 

AWS Dashboard -> EC2 -> EC2 Dashboard -> click on `instances(running)` -> click on `launch instances` -> name and tags(`lb-1`) -> application and os images(`ubuntu`) -> instance type(`t2.micro`) -> Key pair(`processed without  a key pair`) -> network settings -> vpc(`fullstack-vpc`), subnet(`fullstack-subnet-public1-us-east-1a`), auto-assign public ip(`enable`), tick `allow ssh traffic from`, `allow https traffic from the internet`, `allow http traffic from the internet` -> launch instance


now install update packages and install nginx
```
sudo apt update -y
sudo apt install nginx -y
sudo systemctl status nginx  
```

#### now create 3 new ec2 instances at a time, we will change the instances name later

Dashboard -> EC2 -> EC2 Dashboard -> click on instances(running) -> click on `launch instances` -> name and tags(`front-end`) -> application and os images(`ubuntu`) -> instance type(`t2.micro`) -> Key pair(`create new key pair`), key pair name(`sshkey`), key pair type(`rsa`), private key file format(`.pem`) 
-> create key pair -> network settings -> vpc(`fullstack-vpc`), subnet(`fullstack-subnet-private2-us-east-1b`), tick `allow ssh traffic from`, `allow https traffic from the internet`, `allow http traffic from the internet`, auto-assign public ip(`disable`) -> look at right side `summary` -> number of instances(`3`)
-> launch instance

now change the instances name:

EC2 dashbaod -> click on `instances` -> click on the instances `name` -> edit and change the instances name

![Screenshot from 2023-09-21 18-29-02](https://github.com/Mohsem35/DevOps/assets/58659448/fff57cb5-2ccb-4349-8027-86fc34ffc6c1)


- AWS **`auto-scaling group`** এ health check করার options আছে. EC2 dashboard -> auto scaling groups


### Step 3: Try to access front-end instance from load-balancer instance through ssh


the `sshkey.pem` is being downloaded to my local pc. so, first I have to copy the context of the **`.pem`** key file  

```
# create a file named sshkey.pem in lb-1 instance  
sudo vim sshkey.pem
```

now **`paste`** the .pem file context to the newly created sshkey.pem file in lb-1 instance

```
# now change the access config key
chmod 400 sshkey.pem
```

```
sudo ssh -i sshkey.pem ubuntu@<frontend_private_ip>
```

### Step 4: Initialize a react app in the frontend instance

এখন frontend instance তে react application install করব. frontend instance তে কোন public ip নাই, তাই সে NAT gateway এর through তে package গুলো install করবে. 
- মানে এইখানে **`outbound request allowed`**, কিন্তু inbound allowed না
- তার মানে আমাদের load-balancer instace থেকে ssh করে frontend instance তে ঢুকে, react app টা install করতে হবে 

<img width="500" alt="Screenshot 2023-09-22 at 8 52 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d5c0339f-d107-4dc3-8575-14eddb322305">


```
sudo ssh -i sshkey.pem ubuntu@<frontend_private_ip>            # ssf from load-balancer instance
```

```
# in frontend instance
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y
```
gcp te jeivabe nodejs ar corepack install korechilam oi vabe 2 ta korbo

```
sudo corepack enable
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
sudo pnpm preview --host --port 80            # have to define port number
```

<img width="600" alt="Screenshot 2023-09-22 at 9 06 42 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/86fbd7c5-23d5-4c4d-9e01-c5a0c0adec15">


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
