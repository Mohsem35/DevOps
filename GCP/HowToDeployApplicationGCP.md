
![rsz_260202116-f232e34d-13f9-4e61-bee0-1b497a852ae4](https://github.com/Mohsem35/DevOps/assets/58659448/c83af4b2-82fb-42f6-b554-29ebc1ba9bc5)

Proxy: **`hiding client's IP address`**। আমি আমার সার্ভারের IP hide করে রাখতে চাচ্ছি

### Forward proxy 
- A forward proxy, often simply referred to as a "proxy," is an intermediary server that sits between a client device (such as a computer or smartphone) and the internet.
- When a client device wants to access a specific resource, **`instead of connecting directly to the target server`**, it sends its request to the forward proxy. The **`proxy then forwards the request to the target server`**, receives the response, and passes that response back to the client


### Reverse proxy 

- A reverse proxy is a server or a software application that sits between client devices (such as web browsers) and backend servers. 
- Its primary function is to act as an intermediary for client requests, **`forwarding requests to appropriate backend servers and then returning the servers`** responses back to the clients.

![Untitled-2023-07-30-1657](https://github.com/Mohsem35/DevOps/assets/58659448/0aadfb3d-5298-4111-9ee3-e2b346194845)




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

```
cd /<project_name_directory>
yarn
yarn run build
yarn preview
```
```
# expose the port of the host machine for react app
yarn preview --host --port 80
sudo 
```
