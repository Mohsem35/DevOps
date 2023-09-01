
#### Dockerfile

```
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get -y install sudo curl wget unzip git make apt-transport-https ca

# Install prerequisites and download Google Cloud SDK
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    && curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key-add - \
    && echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && apt-get update && apt-get install -y google-cloud-sdk

WORKDIR /automation
COPY. /automation
```

#### devcontainer.json

```
{
    "name": "Terraform and Azure CLI 2.0",
    "dockerFile": "Dockerfile",
    "settings": {
      "terminal.integrated.shell.linux": "/bin/zsh"
    },
    "extensions": ["ms-vscode.azurecli"],
    "postCreateCommand": "uname -a",
    "remoteUser": "root"
  }
```

#### Service Accounts
<img width="600" alt="Screenshot 2023-09-01 at 9 21 12 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/bdfb165a-19cd-4bae-9c0f-885f6faf76be">

- copy `Service Account Credentials` and paste that into `auth.json` file of `.devcontainer` directory

![Untitled-2023-09-01-2108](https://github.com/Mohsem35/DevOps/assets/58659448/69eb74e5-d793-4146-856f-8704c8399c6f)





