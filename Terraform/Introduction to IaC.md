
## Introduction to Infrastructure as Code(IaC)


### Types of IAC Tools

1. **Configuration Management**
    - `Ansible`, puppet, SALTSTACK
        - _Designed to install and manage software_
        - Maintains standard structure
        - Version Control
        - _Idempotent (we can run the code multiple times and everytime we run it, it will only make changes that are necessary to bring the environment into a defined state)_

2. **Server Templating**
    - `docker`, Packer, Vagrant
        - _Custom image of a virtual machine or a container_
        - _Pre installed software and dependencies_
        - Immutable infrastructure
3. **Provisioning Tools**
    - `Terraform`, CloudFormation
        - Deploy immutable infrastructure resources
        - Servers, databases, network components etc.
        - Multiple providers

EC2 createion shell script

```shell
#!/bin/bash

IP ADDRESS="10.2.2.1"
EC2 INSTANCE=$(ec2-run-instances --instance-type t2.micro ami-0edab43b6fa892279)
INSTANCE=$(echo ${EC2_INSTANCE} | sed 's/*INSTANCE //' | sed 's/ .* // ')

# Wait for instance to be ready
while ! ec2-describe-instances $INSTANCE | grep -q "running"
do
    echo Waiting for $INSTANCE is to be ready...
done

# Check if instance is not provisioned and exit 
if [ ! $(ec2-describe-instances $INSTANCE | grep -q "running") ]; then
fi
    echo Instance $INSTANCE is stopped.
    exit
fi 

ec2-associate-address $IP ADDRESS -i $INSTANCE

echo Instance $INSTANCE was created successfully!!!
```



### Why Terraform ?

A **Provider** helps Terraform manage third-party platforms through their API. Providers enable Terraform manage **cloud platforms** like AWS, GCP etc, as well as **network infrastructure** like BigIP, CloudFlare, DNS, Palo Alto as well as **monitoring and data management tools** like DataDog, Auth0, Wavefront, Grafana. **Databases** like InfluxDB, MongoDB, MySQL, PostgreSQL and version control systems like GitHub, Bitbucket, GitLab.

Terraform supports 100 of such providers and can work with almost every infrastructure platform.

#### HCL (HashiCorp Configuration Language)

Terraform uses HCL which is **simple declarative language** to define the infrastructure resources to be provisioned as blocks of code

Configuratiion file that has **`.tf`** file extension. 


_Q: What does declarative mean?_

Terraform works in 3 phases

1. **Init**: Terraform **initializes** the project and **identifies the providers** to be used for the target environment.
2. **Plan**: Terraform **drafts a plan** to get to the target state
3. **Apply**: Terraform **makes the necessary changes** required on the target environment to bring it to the desired state.

#### Resource

Every object that Terraform manages is called a resource. Resource can be a **compute instance**, a **database server in the cloud** or in a physical server on-premise that Terraform manages.

Terraform manages the lifecycle of the resources from it's provisioning to configuration to decommissioning.

#### Terraform State

Terraform **records the state of the infrastructure**  

Based on this, it can determine **what actions to take** when updating resources for a particular platform. Terraform can **ensure** that the entire infrastructure is always in the **defined state at all times**.

**`terraform.tfstate`**

- The `state` is a **blueprint** of the infrastructure deployed by Terraform. 
- Terraform can **read attributes** of existing infrastructure components by configuring data sources. This can later be used for configuring other resources within Terraform 

#### Terraform Cloud and Terraform Enterprise

Provide additional features taht allow simplified collaboration between teams managing infrastructure, improved security and centralized UI to manage Terraform deployments