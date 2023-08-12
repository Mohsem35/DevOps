
![rsz_260202116-f232e34d-13f9-4e61-bee0-1b497a852ae4](https://github.com/Mohsem35/DevOps/assets/58659448/c83af4b2-82fb-42f6-b554-29ebc1ba9bc5)

Proxy: **`hiding client's IP address`**। আমি আমার সার্ভারের IP hide করে রাখতে চাচ্ছি

### Forward proxy 
- A forward proxy, often simply referred to as a "proxy," is an intermediary server that sits between a client device (such as a computer or smartphone) and the internet.
- When a client device wants to access a specific resource, **`instead of connecting directly to the target server`**, it sends its request to the forward proxy. The **`proxy then forwards the request to the target server`**, receives the response, and passes that response back to the client


### Reverse proxy 

- A reverse proxy is a server or a software application that sits between client devices (such as web browsers) and backend servers. 
- Its primary function is to act as an intermediary for client requests, **`forwarding requests to appropriate backend servers and then returning the servers`** responses back to the clients.

![Untitled-2023-07-30-1657](https://github.com/Mohsem35/DevOps/assets/58659448/0aadfb3d-5298-4111-9ee3-e2b346194845)

### What is Stateless and Stateful communication?

#### Stateless:
In a stateless communication model, each **`request`** from a client to a server is **`independent and self-contained`**. The server does not maintain any information about previous requests or the client's context. Each request **`contains all the necessary information for the server`** to process it and generate a response. Stateless protocols are designed to be simple and lightweight. HTTP is a prime example of a stateless protocol. Each HTTP request carries all the necessary information, and the **`server doesn't inherently remember previous requests`** from the same client.

#### Stateful:
In a stateful communication model, the **`server maintains information about the client's context and previous interactions`**. This allows the server to remember things like **`session data`**, **`user authentication status`**, and other details. As a result, subsequent requests can build upon the context of previous requests. Protocols that rely on stateful communication often require some form of session management to keep track of client-specific information.


### Steps need to be done for deploying a application in GCP

#### Step 1: Create a VPC 

search `vpc networks` in search box -> `create vpc network` -> `name(app-vpc-1)`, `subnet name(app-subnet-1)`, `region(us-central-1)`, `ipv4 range(192.168.0.0/24)`, `ipv4 firewall rules(allow all)` -> create

#### Step 2: Create an instance template vm as we will need multiple vm/instances

search `compute engine` in search box -> click `+` button for `create instance` -> choose 2nd option named as `new vm instance from template` from left sidebar -> create instance template -> `name(app-instance-template-1)`, `series(E2)`, `firewall(allow both http & https traffic)` -> advanced options -> networking -> network interfaces -> `network(app-vpc-1)`, `subnetwork(app-subnet-1(us-central-1))`, `external ipv4 address(none)` -> create

<img width="750" alt="Screenshot 2023-08-12 at 12 08 33 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/b980a1cc-3977-4fbd-bf05-cabc98c64416">


#### Step 3: Create an vm/instance for load balancing & reverse proxy

- load balance & reverse proxy vm তে public IP লাগবে 

search `compute engine` in search box -> create instance -> choose 2nd option named as `new vm instance from template` from left sidebar -> select `app-instance-template-1` -> continue -> `name(app-lb-1)` -> advanced options -> networking -> network interfaces -> external ipv4 address(ephemeral) -> create


#### Step 4: Create an vm/instance for frontend server[no public IP]

- frontend server তে কোন public IP থাকবে না

search `compute engine` in search box -> create instance -> choose 2nd option named as `new vm instance from template` from left sidebar -> select `app-instance-template-1` -> continue -> `name(app-frontend-1)` -> create

#### Step 5: Create two vms for backend server[no public IP]

- backend server তে কোন public IP থাকবে না

search `compute engine` in search box -> create instance -> choose 2nd option named as `new vm instance from template` from left sidebar -> select `app-instance-template-1` -> continue -> `name(app-backend-1)` -> create

for 2nd vm: follow the above vm creation criteria with name `name(app-backend-2)`

<img width="750" alt="Screenshot 2023-08-12 at 12 27 56 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/37979722-aa04-497e-9406-61cdedc85932">

#### Step 6: Access(ssh) to 'lb & reverse proxy' vm and install nginx 

- install nginx

```
sudo apt update -y
sudo apt install nginx -y
sudo systemctl status nginx
```

<img width="700" alt="Screenshot 2023-08-12 at 12 35 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/0a3125a2-b954-41c4-9362-af831c06c9b6">

- browser থেকে 'lb & reverse proxy' vm এর public ip তে request করলে nginx page আসে। তারমানে কাজ করতেছে

<img width="750" alt="Screenshot 2023-08-12 at 12 53 04 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/69267e0f-9a89-47a5-a3d4-bb7ddf53f106">

- change content of nginx and reload(not mandatory)

```
cd /var/www/html
sudo vim index.nginx-debian.html
sudo nginx -s reload
```


#### Step 7: Create 'cloud NAT' for private vm/instances

- frontend and backend সার্ভারগুলো তে **`private ip`** দেয়া, কোন public ip দেয়া হয় নাই। তাই বাহিরের internet এর সাথে communicate করার জন্য **`Cloud NAT`** লাগবে যাতে করে **`egress`** করা পসিবল হয়

search `cloud NAT` in search box -> get started -> `gateway name(app-gw-1)` -> select cloud router -> `network(app-vpc-1)`, `region(us-central-1)` -> cloud router -> create new router -> `name(app-router-1)` -> create -> cloud nat ip addresses(automatic) -> create 

<img width="750" alt="Screenshot 2023-08-12 at 12 48 44 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/bf22595b-6ba8-4067-914e-4503abc0a285">

- এখন frontend & backend server গুলোতে package update চালালে package update হবে, কেননা **`VPC তে NAT Gateway attach করা হয়েছে`**

#### Step 8: Access(ssh) to 'app-frontend-1' vm and install nodejs

- nodejs version +16 লাগেবে for this task
- react app initialize করব for example purpose

[NodeJS installation for Debian documentation](https://github.com/nodesource/distributions)

```
sudo su
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&\
apt-get install -y nodejs
node -v
exit
```
```
# check yarn
sudo corepack enable
yarn -v
```
```
# create react application
yarn create vite 
```
```
# project configuration
project name: <project_name>
select a framework: React
select a variant: typescript + swc
```
<img width="700" alt="Screenshot 2023-08-12 at 1 58 32 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/0efee5b7-ed1e-4a93-b008-07aa007a3a2d">

```
cd /<project_name_directory>
yarn
yarn run build
yarn preview
```

- private ip দিয়ে **`4173`** port তে request করলে কোন response আসবে না। 80 port তে mapping করব 

```
# expose the port of the host machine for react app
sudo yarn preview --host --port 80
sudo 
```
- তারপরে ও acces করতে পারব না, কারণ nginx configure করা হয় নাই

#### Step 8: Access(ssh) to 'app-lb-1' vm and configure nginx
```
sudo apt install -y telnet net-tools
```
