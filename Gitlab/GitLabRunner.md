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
```
sudo gitlab-runner register
```
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

```
sudo gitlab-runner restart
sudo gitlab-runner run
sudo gitlab-runner status
```

```
Runtime platform                                    arch=amd64 os=linux pid=9330 revision=85586bd1 version=16.0.2
gitlab-runner: Service is running
```

