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
