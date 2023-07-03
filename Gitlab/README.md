## Introduction to CI/CD and GitLab
CI - Continuous Integration

CD - Continuous Deployment & Continuously Delivery


![sxie0vm15pd316ea0g6v](https://github.com/Mohsem35/DevOps/assets/58659448/a7ec2869-8d1d-45a3-a7e8-1a52d9476bb7)

## Core Concepts of GitLab CI/CD

### Jobs:

Jobs are the most fundamental building block of a `.gitlab-ci.yml` file
- Jobs define what we do.
- Must contain at least the `script` clause
- `script` section specify the commands(any kinds of commands like linux commands etc.) to execute
- we can define as many jobs as we want
- `before_script` define commands that should run before 'script' commands
- `after_script` define commands that run after each job, including failed jobs

### Pipeline:

- The top-level component of continuous integration, delivery and development.
- A pipeline consists of jobs and stages
- **On every commit, GitLab triggers the pipeline automatically**
  - run_tests -> build_image -> push_image
  
![rsz_245695476-f3fce85c-3c4a-454c-9aae-bbbdb2ae3374](https://github.com/Mohsem35/DevOps/assets/58659448/94b81457-92e7-41f6-aec6-ced6b36fd193)

- We configure Pipeline for a specific project.
- By default, Pipeline is triggered automatically for all branches.

> **_NOTE:_**  Each pipeline is run on a fresh environment


#### To work with any existing GitLab project for CI/CD:

1. Fork the project, that you want to work with
2. Add a new file, in the root of the repository named `gitlab-ci.yml(Pipeline file)`


#### How to execute Pipeline:

```
Left sidebar project repository -> Build -> Pipelines
```
#### In order to change Pipeline logic: 

```
Left sidebar project repository -> Build -> Pipeline Editor
```

![rsz_245697333-d726b51b-8fa4-4728-9890-5202747fcac9](https://github.com/Mohsem35/DevOps/assets/58659448/166b1149-093f-405f-8b0a-ce4105b14501)

### Stages:

- You can `group multiple jobs` into stages that run in a defined order.
- Multiple jobs in the same stage are executed in **parallel.**
- Only if al jobs in a stage succeed, the pipeline moves on to the next stage
- If any job in a stage fails, the next stage in not executed and the pipeline ends

### Needs:


- Execute jobs in a certain order within a stage. If it fails, it should skip the other dependents jobs.
- Job keyword to **define dependency relationships bwtween the jobs**.
- Even though they belong to same stage, `push image` job is dependent on `build_image` job. If build image job fails, then push image will be skipped.
  
![rsz_245735895-e0a9edd6-ca9e-4a7f-b28e-deaa3f8f0166](https://github.com/Mohsem35/DevOps/assets/58659448/988c7ac9-d6ba-4ca9-9487-7ef45888f54b)

  
```
push_image:
    stage: build
    needs:
        - build_image 
```
#### Checking the dependent jobs:

```
Left sidebar project repository -> Build -> Pipeline Editor -> Visualize
```

![Screenshot from 2023-06-14 15-00-56](https://github.com/Mohsem35/DevOps/assets/58659448/2d8e7177-daff-40ff-9b21-cd8c97c9fbf4)

#### Scripts:

##### Inline commands
- OS commands, like Linux comman

> **_NOTE:_**  If there are too many Linux commands, **prepare a seperate bash-script file** where you will keep all the Linux commands and reference the bash-script file in 'script' section of yml file.

```
 - chmod +x <script_filename>.sh
 - ./<script_filename>.sh
```

#### Only:

This pipeline logic jobs should only run for **main** branch and the other jobs should run on **feature** branch 
```
Left sidebar project repository -> Code -> Branches -> New branch
```

![rsz_245765717-720b474b-b011-4da8-97fd-5a333e06e1df](https://github.com/Mohsem35/DevOps/assets/58659448/336c22e5-83a8-4f72-808f-5ecebdcef0e3)


The following `build image` job will be executed only main branch. 
```
build_image:
    only: 
        - main
    stage: build
    script:
        - echo "Building the docker image..."
        - echo "Tagging the docker image..."
```

**except:** Define when a job does not run

![rsz_246033120-ffb683a7-7e64-4239-ba9b-b2d59daee1bc(1)](https://github.com/Mohsem35/DevOps/assets/58659448/e4997fc6-dd97-44dd-a486-14171731dc7b)


#### Workflow rules:

- A global keyword, which configures the whole pipelines behavior.
- Have to declare at first section of the `.yml` file
- `if`,`when` are 2 conditionals.
- `$CI_COMMIT_BRANCH`, `$CI_PIPELINE_SOURCE` = Environment variables

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

#### Custom Variables:


Project variables:
1. Stored outside the git repository(not in the .gitlab-ci.yml)
2. Ideal for tokens and passwords, which should not be included in the repository for security reasons!


Protected variables: variables are only abailable when the pipeline runs on a protected branch

Masked variables; Variables containing secrets should always be masked. With this, you avoid the risk of exposing the value of the variable,

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

- Consists of a key, value and file
- Value is saved to a temporary file.
- The value of the variable is the path to the temporary file

![Screenshot from 2023-06-18 12-32-55](https://github.com/Mohsem35/DevOps/assets/58659448/d6afe441-1137-4b07-b2e4-ce7d0e09de52)

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
#### Declaring Variables in .gitlab-ci.yml File:

- Variables saved in the file directly should store only non-sensitive data, cause the values will be visible in the repository
- Declare variables as global
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
#### Gitlab Architecture:

##### Gitlab Server
- Main component
- Pipeline configuration
- Manage the pipeline execution
- Stores the pipeline results
- 
##### Gitlab Runner

GitLab Runner is a program that you should install on a machine, that's seperate from the one that hosts the GitLab instance.

`Shared Runners:` The provided runners by GitLab are shared runners. Available to all projects in a GitLab instance(gitlab.com)

- Jobs are mainly executed in RUNNERS
- GitLab Runners are agents that run your CI/CD jobs
- GitLab Server assigns these jobs to available Runners
  
![Screenshot from 2023-06-18 13-56-37](https://github.com/Mohsem35/DevOps/assets/58659448/31afcfea-32c7-4a8a-8e77-a2cfd6e991d9)

Q: Who manages GitLab Architecture?

Ans: gitlab.com(Saas) or self-managed 

#### Override Docker Image

- Best practice: use a specific version
- Because latest is unpredictable
- Image configuration works only for Docker Runners, will be ignored by other Runners.

```
image: node:20-alpine
```
![Screenshot from 2023-06-19 12-44-47](https://github.com/Mohsem35/DevOps/assets/58659448/820d859b-c8de-436a-bbf8-e3e38efcd199)

#### Executors:

You need Gitlab Runner to run jobs in a pipeline. But you need **another component for the actual execution**

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

#### GitLab WorkFlow:

Runner **requests jobs** from GitLab instance -> Runner **compiles and sends** job's plyload to Executor -> Executor **clones/download artifacts** for GitLab instance and **executes job** -> Executor resturns **job output to Runner** -> Runner updates **job output to Gitlab instance**

![rsz_1246654807-f05d4d66-63bc-4257-b71d-46c34ba3b8be](https://github.com/Mohsem35/DevOps/assets/58659448/31db0c11-df82-4983-991c-9941e7d0ea14)



