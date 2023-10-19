### Agendas

- [Introduction to CI/CD and GitLab](#introduction-to-cicd-and-gitLab)
- [Core Concepts of GitLab CI/CD](#core-concepts-of-gitlab-cicd)
  - [Jobs](#jobs)
  - [Pipeline](#pipeline)
  - [Stages](#stages)
  - [Needs](#needs)
  - [Scripts](#scripts)
  - [Only](#only)
  - [Except](#except)
  - [Workflow rules](#workflow-rules)
- [Custom Variables](#custom-variables)
- [GitLab Architecture](#gitlab-architecture)
  - [GitLab Server](#gitlab-server)
  - [GitLab Runner](#gitlab-runner)
  - [Override Docker Image](#override-docker-image)
  - [Executors](#executors)
  - [Docker Executor](#docker-executor)
- [GitLab WorkFlow](#gitlab-workflow)


### Introduction to CI/CD and GitLab
CI - Continuous Integration

CD - Continuous Deployment & Continuously Delivery

![rsz_248164286-a7ec2869-8d1d-45a3-a7e8-1a52d9476bb7](https://github.com/Mohsem35/DevOps/assets/58659448/a75f2645-1c83-451e-9037-e746fa82981d)


### Core Concepts of GitLab CI/CD

#### Jobs:

A job in the **`.gitlab-ci.yml`** file represents a **`specific task or set of tasks`** that you want to execute as part of your CI/CD pipeline. Jobs are the most fundamental building block of a _.gitlab-ci.yml_ file.


- Must contain at least the **`script`** clause. _script_ section specify the commands(any kinds of commands like linux commands etc.) to execute
- We can define as many jobs as we want
- Jobs can have a variety of attributes and directives, including: **`script`**, **`tags`**, **`artifacts`**, **`stages`**, **`dependencies`**, **`before_script`**, **`after_script`**

#### Pipeline:

A pipeline represents the **`entire sequence`** of stages, jobs, and steps defined in the configuration file. It defines the end-to-end workflow for building, testing, and deploying your code

- Pipeline logic becomes part of application code as **`IaC(Infrastructure as code)`**
- The top-level component of continuous integration, delivery and development.
- A pipeline consists of **`jobs`**, **`stages`**, **`steps`**, **`artifacts`**
- On every **`commit`**, GitLab triggers the **`pipeline automatically`**
- We configure Pipeline for a specific project.
- By default, Pipeline is triggered automatically for all branches.

![rsz_1_bx1gnz1uzfkokmrhq395mg](https://github.com/Mohsem35/DevOps/assets/58659448/7400be1f-5612-4dea-aedf-3350b54ac015)

> **_NOTE:_**  Each pipeline runs on a fresh environment

#### List of succeed/failed pipelines:

_Left sidebar of `project repository` -> Build -> Pipelines_

#### In order to change Pipeline logic: 

_Left sidebar `project repository` -> Build -> Pipeline Editor_

#### Stages:

Stages allow you to **`divide`** your pipeline into **`logical sections`**, each representing a specific phase of your software development process. Stages are defined as a list of names at the top level of the _.gitlab-ci.yml_ file.

```
stages:
  - build
  - test
  - deploy
```
In this example, there are three stages defined: build, test, and deploy. Jobs associated with the **`build`** stage will be **`executed first`**, followed by jobs in the test stage, and finally, jobs in the deploy stage.

- You can **`group multiple jobs`** into stages that run in a defined order.
- Multiple jobs in the same stage are executed in **`parallel`**
- Only if all jobs in a stage **`succeed`**, the pipeline moves on to the **`next stage`**
- If any job in a stage fails, the next stage in not executed and the pipeline ends



![pipelines](https://github.com/Mohsem35/DevOps/assets/58659448/541b6bbb-3038-42ea-b386-0ed16cc23339)


#### Needs:

The needs keyword is used to define **`dependencies`** between jobs.  It allows you to specify that a particular job depends on the **`successful completion`** of one or more previous jobs before it can start.

- Execute jobs in a certain order within a stage. If it **`fails`**, it should **`skip`** the other dependents jobs.
- Even though they belong to same stage, **`push image`** job is dependent on **`build_image`** job. If build image job fails, then push image will be skipped.
```
push_image:
    stage: build
    needs:
        - build_image 
```
![Screenshot from 2023-06-14 15-00-56](https://github.com/Mohsem35/DevOps/assets/58659448/2d8e7177-daff-40ff-9b21-cd8c97c9fbf4)


#### Checking the dependent jobs:

_Left sidebar `project repository` -> Build -> Pipeline Editor -> Visualize_



#### Scripts:

##### Inline commands
- Any valid shell commands or scripts that are necessary for the job
- For example, you might use it to **`compile code`**, **`run tests`**, **`package artifacts`**, or perform any other necessary tasks
```
build_job:
  stage: build
  script:
    - npm install
    - npm run build
    - echo "Running builds..."
```

> **_NOTE:_**  If there are too many Linux commands, **prepare a seperate bash-script file** where you will keep all the Linux commands and reference the bash-script file in 'script' section of yml file.

```
 - chmod +x <script_filename>.sh
 - ./<script_filename>.sh
```

#### Only:

The only keyword allows you to **`control`** the execution of jobs and ensure they run only in **`specific scenarios`** that meet the defined conditions.

- This pipeline logic jobs should only run for **`main branch`** and the other jobs should run on feature branch

  
Left sidebar project repository -> Code -> Branches -> New branch
```
only:
  - main
  - develop
```
```
only:
  variables:
    - $ENVIRONMENT == "production"
```
![rsz_248272921-336c22e5-83a8-4f72-808f-5ecebdcef0e3](https://github.com/Mohsem35/DevOps/assets/58659448/8fc8a934-b5c1-4f59-940c-a9ed86c53a38)


#### Except: 

The except keyword is used to specify conditions under which a job should **`not`** be executed.

```
except:
  - feature/*
```

#### Workflow rules:

In GitLab, workflow rules are used to define the **`conditions`**(like if-else in programming) under which a job or a set of jobs should be executed in a CI/CD pipeline. They are defined within the _.gitlab-ci.yml_ file, which is the configuration file for GitLab CI/CD pipelines.

Workflow rules provide a **`flexible way to control`** when jobs should run based on various conditions such as the branch name, tags, variables, changes to specific files, and more. They allow you to define fine-grained control over the execution of your CI/CD pipeline based on specific events and conditions

- Have to declare at first section of the _.gitlab-ci.yml_ file
- **`if`**,**`when`** are 2 conditionals
- _$CI_COMMIT_BRANCH_, _$CI_PIPELINE_SOURCE_ = Environment variables

```
workflow:
    rules:
        - if: $CI_COMMIT_BRANCH != "main"
          when: never
        - when: always
```

> **_NOTE:_**  GitLab 'merge request' == GitHub 'pull request'

```
workflow:
    rules:
        - if: $CI_COMMIT_BRANCH != "main" && $CI_PIPELINE_SOURCE != "merge_request_event"
          when: never
        - when: always
```

[Predefined variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) 

### Custom Variables:

#### Project variables:
1. Stored outside of the git repository(not in the _.gitlab-ci.yml_)
2. Ideal for **`tokens`** and **`passwords`**, which should not be included in the repository for security reasons!


#### Protected variables: 
variables are only available when the pipeline runs on a protected branch

#### Masked variables:
Variables containing secrets should always be masked. With this, you avoid the risk of exposing the value of the variable,

##### How to define Environment Variables:

![Screenshot from 2023-06-15 18-31-00](https://github.com/Mohsem35/DevOps/assets/58659448/9218785a-23d5-4206-9ad7-d43c72fcbf76)


> **_NOTE:_** Environment variable names should be in UPPER CASE format for standardization.
![Screenshot from 2023-06-15 18-33-56](https://github.com/Mohsem35/DevOps/assets/58659448/6f0ea843-28d8-4003-9abf-a56bfb3999a0)
![Screenshot from 2023-06-15 18-35-03](https://github.com/Mohsem35/DevOps/assets/58659448/315f9846-9a4e-4e18-886f-cce238085086)

##### Define variable in Pipeline Editor:

```
run_tests:
    stage: test
    script:
        - echo "Running unit tests for micro service $MICRO_SERVICE_NAME ..."
```
#### File Type Variables:

- Consists of a **`key`**, **`value`** and file
- Value is saved to a **`temporary file`**.
- The value of the variable is the path to the temporary file

![rsz_1246647594-d6afe441-1137-4b07-b2e4-ce7d0e09de52](https://github.com/Mohsem35/DevOps/assets/58659448/80ca74fb-7232-4bd4-b450-d7d0ad833152)


![Screenshot from 2023-06-18 12-55-33](https://github.com/Mohsem35/DevOps/assets/58659448/9f3df1f3-2399-41d5-bce6-5282b72df1ce)
![Screenshot from 2023-06-18 12-56-36](https://github.com/Mohsem35/DevOps/assets/58659448/dd50f2ec-8d3e-4837-b0ae-8db0079b71b9)


```
deploy_image:
    only:
        - main
    stage: deploy
    script:
        - echo "Deploying new docker image using the following configuration file - $PROPERTIES_FILE..."
        - cat $PROPERTIES_FILE
```
### Declaring Variables in .gitlab-ci.yml File:

- Variables saved in the file directly should store only **`non-sensitive data`**, cause the values will be visible in the repository
- Declare variables as **`global`**
- Then use the variables like programming

```
variables:
    image_repository: docker.io/myapp
    image_tag: v1.0
    
run_tests:
    stage: test
    before_script:
        - echo "ushing docker image $image_repository:image_tag to registry..."
```
### GitLab Architecture:

#### GitLab Server
- Main component
- Pipeline configuration
- Manage the pipeline execution
- Stores the pipeline results
  
#### GitLab Runner

GitLab Runner is a program that you should install on a machine, that's seperate from the one that hosts the GitLab instance.

**`Shared Runners:`** The provided runners by GitLab are shared runners. Available to all projects in a GitLab instance(_gitlab.com_)

- Jobs are mainly **`executed`** in RUNNERS
- GitLab Runners are **`agents`** that run your CI/CD jobs
- GitLab Server assigns these jobs to available Runners
  
![Screenshot from 2023-06-18 13-56-37](https://github.com/Mohsem35/DevOps/assets/58659448/31afcfea-32c7-4a8a-8e77-a2cfd6e991d9)

Q: Who manages GitLab Architecture?

Ans: _gitlab.com(Saas)_ or self-managed 

#### Override Docker Image

- Best practice: use a **`specific version`**, because latest is unpredictable
- **`Image`** configuration works only for **`Docker Runners`**, will be ignored by other Runners.

```
image: node:20-alpine
```
![Screenshot from 2023-06-19 12-44-47](https://github.com/Mohsem35/DevOps/assets/58659448/820d859b-c8de-436a-bbf8-e3e38efcd199)

#### Executors:

You need GitLab Runner to run jobs in a pipeline. But you need **another component for the actual execution**

Alternative Executors
1. Shell
2. Docker(best option)
3. Virtual Machine
4. Kubernetes
5. Docker Machine Executor 

> **_NOTE:_**  GitLab's shared runner are using Docker Machine executor

##### Docker Executor

- Commands are executed inside a container
- Jobs run on user provided Docker images
- Each job runs in a seperate and isolated container
- Once the job is done, containers get removed
- All tools needed can be put in the Docker image
- You only need to install Docker itself
- Because of isolation, no version conflicts like npm6, npm7

![Screenshot from 2023-06-18 15-12-04](https://github.com/Mohsem35/DevOps/assets/58659448/82768f8a-42fd-46bf-9bd0-ec8c519d2ca5)

Q: How to configure the executor for the runner?

Ans: When you register a runner, you must choose an executor. **1 executor per runner**

### GitLab WorkFlow:

Runner **requests jobs** from GitLab instance -> Runner **compiles and sends** job's plyload to Executor -> Executor **clones/download artifacts** for GitLab instance and **executes job** -> Executor resturns **job output to Runner** -> Runner updates **job output to GitLab instance**

![rsz_1248531016-31db0c11-df82-4983-991c-9941e7d0ea14](https://github.com/Mohsem35/DevOps/assets/58659448/832cc885-41f0-42c7-84fd-563a310b0d61)



#### To work with any existing GitLab project for CI/CD:

1. Fork the project, that you want to work with
2. Add a new file, in the root of the repository named `gitlab-ci.yml(Pipeline file)`
