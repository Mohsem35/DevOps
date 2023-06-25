### Final Real Life Pipeline - Overview

1. **Unit Tests** = Testing individual code components rather than the code as a whole
2. **Static Application Security Testing(SAST)** 
- SAST analyzes the code itself without actually executing the code
- It scans code for any security vulnerabilities

3. **Build Docker Image**
4. **Push to Docker Registry**
5. **Deploy to Dev**
6. **Promote to Prod Environment**

`Dockerfile` = Consists of instructions to build the docker image

`package.json` = The heart of nay Node project. Defines all the dependencies and metadata about the project

`server.test.js` = These are the unit tests we will execute in the CI/CD pipeline

`jest` = A JavaScript testing framework

```
cd /app
```

```
npm install
npm start
npm test        #for testing
```

![Screenshot from 2023-06-25 18-38-19](https://github.com/Mohsem35/DevOps/assets/58659448/e4174cd5-e089-49b1-9e03-0c937d479d9c)
