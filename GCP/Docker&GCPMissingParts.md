
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


- `makefile` দিয়ে GCP VPC, vm সবকিছু configure করতেছি

[GCP Provisioning commands from CLI](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#gcloud_1)

[Google CLI overview](https://cloud.google.com/sdk/gcloud)

[gcloud reference overview](https://cloud.google.com/sdk/gcloud/reference/compute/addresses)

```
gcloud_describe_network:
    @ gcloud compute networks describe ${VPC}
REGION:= us-east1,
SUBNET:= web
SUBNET_CIDR:= 10.10.0.0/16
ZONE:= us-east1-b
MACHINE_TYPE:= n1-standard-1
gcloud_create_subnet:
    @ gcloud compute networks subnets create ${SUBNET} \
                   --network ${VPC} \
                   --region ${REGION} \
                   --range ${SUBNET_CIDR}

gcloud_list_subnet:
    @ gcloud compute networks subnets list

INSTANCE_NAME:= lb
delete_vm:
    @ gcloud compute instances delete $(INSTANCE_NAME) --project=$(PROJECT_ID) --zone=$(ZONE) --quite
delete_subnet:
    @ gcloud compute networks subnets delete $(SUBNET) --project=$(PROJECT_ID) --zone=$(ZONE) --quite
delete_vpc:
    @ gcloud compute networks delete $ (NETWORK) --project=$(PROJECT_ID) --quite


INSTANCE_NAME:= lb
gcloud_create_vm:
    @ gcloud compute instances create ${INSTANCE_NAME} \
       --project=${PROJECT_ID} --zone=${ZONE} \
       --machine-type=${MACHINE_TYPE} --subnet=${SUBNET} \
       --image-family-debian-10
       --boot-disk-size=20GB
       --image-project-debian-cloud
       --tag=
       --metadata ssh-keys=root:ssh-rsa AAAAB3NzaC... example@example

all: gcloud_login gcloud_set
```





```
make gcloud_set
```
```
make gcloud_list_network
```

```
make all
```
```
gcloud compute instances list
```
```
make delete_vm
```

