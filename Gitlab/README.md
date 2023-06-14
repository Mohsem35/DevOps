CI - Continuous Integration

CD - Continuous Deployment/Delivery

Automatically and continuously Code changes -> Test -> Build -> Release

Jobs: Jobs are the most fundamental building block of a .gitlab-ci.yml file
- jobs define what we do
- must contain at least the script clause
- `script` section specify the commands(any kinds of commands like linux commands etc.) to execute
- we can define as many jobs as we want
- `before_script` define commands that should run before 'script' commands
- `after_script` define commands that run after each job, including failed jobs

Job keywords: before_script and after_script

Pipeline:
- The top-level component of continuous integration, delivery and development.
- A pipeline consists of jobs and stages
- On every commit, GitLab triggers the pipeline automatically
run_tests -> build_image -> push_image
- We configure Pipeline for a specific project

1. Fork the project, that you want to work with
2. Add a new file, in the root of the repository named 'gitlab-ci.yml'(Pipeline file)


Pipeline Execution:

Settings -> CI/CD ->

Build -> Pipeline

in order to change pipeline logic: Build -> Pipeline Editor


Much nicer view: Build -> Pipeline -> Click on the
