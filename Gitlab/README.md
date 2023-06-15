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

- We configure Pipeline for a specific project.
- By default, Pipeline is triggered automatically for all branches.

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

#### Needs:


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

#### Only:

This pipeline logic jobs should only run for **main** branch and the other jobs should run on **feature** branch 
```
Left sidebar project repository -> Code -> Branches -> New branch
```
![Screenshot from 2023-06-14 16-43-45](https://github.com/Mohsem35/DevOps/assets/58659448/720b474b-b011-4da8-97fd-5a333e06e1df)

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
![Screenshot from 2023-06-15 13-45-52](https://github.com/Mohsem35/DevOps/assets/58659448/ffb683a7-7e64-4239-ba9b-b2d59daee1bc)

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

