[Install GitLab Runner Linux](https://docs.gitlab.com/runner/install/)

### Set up the GitLab-Runner service on a VM

1. Simply download one of the binaries for your system:
For CentOS or Red Hat Enterprise Linux:
```
# Replace ${arch} with any of the supported architectures, e.g. amd64, arm, arm64
# A full list of architectures can be found here https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html
sudo curl -L --output /usr/local/bin/gitlab-runner "https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64"
```

2. Give it permissions to execute:
```
sudo chmod +x /usr/local/bin/gitlab-runner
```

3. Create a GitLab CI user:
```
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
```

4. Install and run as service:
```
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start
gitlab-runner -version
sudo systemctl status gitlab-runner.service
```

Ensure you have `/usr/local/bin/` in `$PATH` for root or you might get a `command not found` error. Alternately, you can install `gitlab-runner` in a different location, like `/usr/bin/.`

### Register Runner

##### 1. Create a file named config.toml

```
sudo vim /etc/gitlab-runner/config.toml
```
```
# output
concurrent = 1
check_interval = 0
shutdown_timeout = 0

[session_server]
  session_timeout = 1800
```

##### 2. Run the following command from Runner instance

```
sudo gitlab-runner register
```

Copy the token number from UI and paste in CLI

![rsz_screenshot_from_2023-06-22_15-35-30](https://github.com/Mohsem35/DevOps/assets/58659448/a5f06572-cd40-4631-8b07-c46cc9a1c147)


```
Enter the GitLab instance URL (for example, https://gitlab.com/):
https://gitlab.com/
Enter the registration token:
GR1348941r-aucWxbUAxUF6HbzYgZ
Enter a description for the runner:
[maly-db]: creating first runner 
Enter tags for the runner (comma-separated):
ubuntu20, local
Enter optional maintenance note for the runner:
Registering runner... succeeded                     runner=GR1348941r-aucWxb
Enter an executor: docker-windows, shell, ssh, virtualbox, docker+machine, instance, custom, docker, kubernetes, parallels, docker-autoscaler:
shell
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
 
Configuration (with the authentication token) was saved in "/etc/gitlab-runner/config.toml" 

```

##### 3. Start the Runner

```
sudo gitlab-runner restart
sudo gitlab-runner run
sudo gitlab-runner status
```

##### 4. Check the config file at Runner machine

```
sudo vim /etc/gitlab-runner/config.toml
```
Output at CLI

```
concurrent = 1
check_interval = 0
shutdown_timeout = 0
![rsz_screenshot_from_2023-06-22_15-59-20](https://github.com/Mohsem35/DevOps/assets/58659448/273f3df3-8fcb-421c-8d7e-1d48e4b73050)

[session_server]
  session_timeout = 1800
[Maly_Mohsem_Ahmed_DevOps_BracIT.pdf](https://github.com/Mohsem35/DevOps/files/11830482/Maly_Mohsem_Ahmed_DevOps_BracIT.pdf)

[[runners]]
  name = "testing purpose"
  url = "https://gitlab.com/"
  id = 24564344
  token = "PKYR8xzvqcx9H3-usDrT"
  token_obtained_at = 2023-06-22T06:33:18Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "shell"![rsz_screenshot_from_2023-06-22_15-35-30](https://github.com/Mohsem35/DevOps/assets/58659448/0d422940-df57-4b7d-b2fa-f87aa70e628e)

  [runners.cache]
    MaxUploadedArchiveSize = 0
~                               
```
Output from GUI

![rsz_1247846216-3f83ea0f-2604-47fc-98d5-97ccb2d26b5c](https://github.com/Mohsem35/DevOps/assets/58659448/a6ade329-3c4b-4511-b29e-748ef95c772b)

##### 5.Edit the Runner(optional)

![rsz_screenshot_from_2023-06-22_15-59-20](https://github.com/Mohsem35/DevOps/assets/58659448/73b6d12f-b9c9-444f-83bc-7f1ab31419d4)

![rsz_screenshot_from_2023-06-22_16-02-57](https://github.com/Mohsem35/DevOps/assets/58659448/5b15111c-2973-4817-a31c-3d4b1d633a2d)


### Run jobs in specific Runner

By default, shared runners will be used if we don't declare tag name in yml file 

##### 1. Run the Runner from instnace

```
sudo gitlab-runner run
```
##### 2. Set specific Runner tag in jobs 

`mynodeapp-cicd -> Build -> Pipeline Editor -> Declare "tags" in yml file -> Run the Pipeline`

```
run_tests:
    tags:
        - ubuntu20      #runner_tag_name 
    stage: test
    before_script:
        - echo "Preparing test data..."
    script:
        - echo "Running unit tests for micro service $MICRO_SERVICE_NAME ..."
    after_script:
        - echo "Cleaning up temporary files..."
```
Output:

```
Runtime platform                                    arch=amd64 os=linux pid=9462 revision=85586bd1 version=16.0.2
Starting multi-runner from /etc/gitlab-runner/config.toml...  builds=0
Running in system-mode.                            
                                                   
Configuration loaded                                builds=0
listen_address not defined, metrics & debug endpoints disabled  builds=0
[session_server].listen_address not defined, session endpoints disabled  builds=0
Initializing executor providers                     builds=0
WARNING: Checking for jobs... failed                runner=PKYR8xzv status=POST https://gitlab.com/api/v4/jobs/request: 409 Conflict
Checking for jobs... received                       job=4519752626 repo_url=https://gitlab.com/mohsem35/mynodeapp-cicd-project.git runner=PKYR8xzv
Job succeeded                                       duration_s=3.0235465 job=4519752626 project=46785502 runner=PKYR8xzv
Appending trace to coordinator...ok                 code=202 job=4519752626 job-log=0-1336 job-status=running runner=PKYR8xzv sent-log=0-1335 status=202 Accepted update-interval=1m0s
Appending trace to coordinator...ok                 code=202 job=4519752626 job-log=0-1699 job-status=running runner=PKYR8xzv sent-log=1336-1698 status=202 Accepted update-interval=1m0s
Updating job...                                     bytesize=1699 checksum=crc32:a0c8fbd3 job=4519752626 runner=PKYR8xzv
Submitting job to coordinator...accepted, but not yet completed  bytesize=1699 checksum=crc32:a0c8fbd3 code=202 job=4519752626 job-status= runner=PKYR8xzv update-interval=1s
Updating job...                                     bytesize=1699 checksum=crc32:a0c8fbd3 job=4519752626 runner=PKYR8xzv
Submitting job to coordinator...ok                  bytesize=1699 checksum=crc32:a0c8fbd3 code=200 job=4519752626 job-status= runner=PKYR8xzv update-interval=0s
```
> **_NOTE:_** যেহেতু Runner, local machine এ চলতেছে(ubuntu), তাই Runner এ সব রকমের dependency install করা থাকতে হবে like npm,node etc


![rsz_1screenshot_from_2023-06-22_13-42-56](https://github.com/Mohsem35/DevOps/assets/58659448/e79f6484-e516-4918-9715-a126da0c6dc9)

### Register Runner on Docker executor 

- Insatll Docker in local machine first
- Add user to Docker group
```
sudo usermod -aG docker $USER
```
- Register the runner
```
sudo gitlab-runner register
```
- Select executor `Docker`
```
Enter an executor: custom, docker, ssh, docker-autoscaler, instance, kubernetes, docker-windows, parallels, shell, virtualbox, docker+machine:
docker

Enter the default Docker image (for example, ruby:2.7):
alpine:3.18.2
```
- Start the Runner
```
sudo gitlab-runner start
sudo gitlab-runner run
```
- Specify tag for Docker executor
```
build_image:
    image: node:17-alpine3.18
    tags:
        - docker 
    stage: build
    script:
        - echo "Building the docker image..."
        - echo "Tagging the docker image..."
```
> **_NOTE:_** Here, image tag will work cause here executor is docker


