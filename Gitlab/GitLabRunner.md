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
