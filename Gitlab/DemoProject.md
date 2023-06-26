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

### Run Unit Tests

```
stages:
  - test

run_unit_tests:
  image: node:20-alpine3.17
  stage: test
  tags:
    - ec2
    - docker
    - remote
  before_script:
    - cd app
    - npm install
  script:
    - npm test
```

Generate Test Report of Jest

#### Job Artifact

Jobs can output an archive of files and directories. This output is called a _Job Artifact_

Different reports like 
- test reports
- code quality reports
- security reports
can be collected 

artifacts:reports

```
  artifacts:
    when: always
    paths:
      - app/junit.xml
    reports:
      junit: app/junit.xml
```
##### JUnit 

- Collects JUnit report XML file
- These are uploaded to GitLab as an artifact

Visualization come from Test Reports

![rsz_screenshot_from_2023-06-26_14-40-12](https://github.com/Mohsem35/DevOps/assets/58659448/cd7f03b5-0295-45ed-800c-954810a7d05b)

![rsz_screenshot_from_2023-06-26_14-42-59](https://github.com/Mohsem35/DevOps/assets/58659448/76d34667-6b58-421d-ad76-496b2455e488)

Download able test reports which should be browse able, so we used `paths` in 'artifacts` section


### Build & Push Docker Image

- Every GitLab project can have its **own space to store its Docker images**
- GitLab strives to become a complete DevOps platform
- Platform on which you build your complete DevOps workflows

GitLab Container Registry
- By default, the Registry is visible to everyone with access to the project

  
![rsz_screenshot_from_2023-06-26_18-25-34](https://github.com/Mohsem35/DevOps/assets/58659448/aad89bc5-379c-435b-b7be-480b95d797e7)


![rsz_screenshot_from_2023-06-26_18-31-51](https://github.com/Mohsem35/DevOps/assets/58659448/a8079f8f-511a-495d-8707-6f4e51a2cb6f)

```
  script:
    - docker build -t registry.gitlab.com/mohsem35/mynodeapp-cicd:1.0 . 
```

