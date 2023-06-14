 ### Introduction to Gitlab CICD
CI - Continuous Integration

CD - Continuous Deployment & Continuously Delivery

![Screenshot from 2023-06-12 12-03-09](https://github.com/Mohsem35/DevOps/assets/58659448/f1925709-9596-412e-a9ce-d9a9a300ff27)


#### Jobs:

Jobs are the most fundamental building block of a `.gitlab-ci.yml` file
- Jobs define what we do.
- Must contain at least the `script` clause
- `script` section specify the commands(any kinds of commands like linux commands etc.) to execute
- we can define as many jobs as we want
- `before_script` define commands that should run before 'script' commands
- `after_script` define commands that run after each job, including failed jobs

#### Pipeline:

- The top-level component of continuous integration, delivery and development.
- A pipeline consists of jobs and stages
- **On every commit, GitLab triggers the pipeline automatically**
  - run_tests -> build_image -> push_image

 ![Screenshot from 2023-06-12 14-47-49](https://github.com/Mohsem35/DevOps/assets/58659448/f3fce85c-3c4a-454c-9aae-bbbdb2ae3374)

- We configure Pipeline for a specific project

> **_NOTE:_**  Each pipeline is run on a fresh environment


#### To work with any existing GitLab project for CI/CD:

1. Fork the project, that you want to work with
2. Add a new file, in the root of the repository named `gitlab-ci.yml(Pipeline file)`


#### Pipeline Execution:

```
Left sidebar project repository -> Build -> Pipelines
```
#### In order to change pipeline logic: 

```
Left sidebar project repository -> Build -> Pipeline Editor
```

![Screenshot from 2023-06-12 18-13-25](https://github.com/Mohsem35/DevOps/assets/58659448/d726b51b-8fa4-4728-9890-5202747fcac9)

#### Stages:

- You can `group multiple jobs` into stages that run in a defined order.
- Multiple jobs in the same stage are executed in **parallel.**
- Only if al jobs in a stage succeed, the pipeline moves on to the next stage
- If any job in a stage fails, the next stage in not executed and the pipeline ends

#### Needs


- Execute jobs in a certain order within a stage. If it fails, it should skip the other dependents jobs.
- Job keyword to **define dependency relationships bwtween the jobs**.
- Even though they belong to same stage, `push image` job is dependent on `build_image` job. If build image job fails, then push image will be skipped.
  
![Screenshot from 2023-06-14 14-56-55](https://github.com/Mohsem35/DevOps/assets/58659448/e0a9edd6-ca9e-4a7f-b28e-deaa3f8f0166)
  
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
