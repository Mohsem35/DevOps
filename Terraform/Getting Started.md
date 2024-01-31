
### Installation

[Install Terraform](https://developer.hashicorp.com/terraform/install?product_intent=terraform)

```shell
terraform version
```

_Q: What is **`resource`**_

Terraform resources are components within a Terraform configuration that **represent infrastructure objects or services** that need to be managed

Resources are the most important element in the Terraform language. Each resource block describes one or more infrastructure objects, such as **virtual networks**, **compute instances**, or higher-level components such as **DNS records**

We will talk here most basic type of resources

1. Local file type of resource
2. Random Pit (special kind of resource)

Terraform supports over 100 providers


### HCL Basics

```shell
<block> <parameters> {
    key1 = value1
    key2 = value2
}
```

<img width="956" alt="Screenshot 2024-01-28 at 9 10 00 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/da9fd6e5-e26b-4f14-9757-4500d45db24b">



Block contains information about the infrastructure platform and a set of resources within that platform

Create a configuration file in local system where Terraform is installed

```shell
mkdir /root/terraform-local-file
cd /root/terraform-local-file
touch local.tf
```

[Offilcial local_file (Resource) Template ](https://registry.terraform.io/providers/hashicorp/local/2.4.0/docs/resources/file)

```
resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
}
```
```
# aws-ec2.tf
resource "aws_instance" "webserver" {
    ami = "ami-0c2f25c1f66a1ff4d"
    instance_type = "t2.micro"
}
```


- Type of block / Block name  = `resource`
- Declaration of resource type that we want to create = `local_file`
    - This is a fixed value and depends on the provider where we want to create resource
    - Resource type provides 2 bits of information 
    - `local = provider` provider information
    - `file = resource` type information

- Resource name = `pet` and the name can be anything
- {} inside, we define arguments in key-value pair formats

A simple Terraform workflow consists of 4 steps

1. Write the configuration file
2. Run Terraform `init` command

3. Review the execution plan using Terraform `plan` command
4. Apply the changes using the Terraform `apply` command

```shell
cd /root/terraform-local-file
terraform init
```

Terraform installed a plugin called `local`
```shell
Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v2.4.1...
- Installed hashicorp/local v2.4.1 (signed by HashiCorp)
```

See the execution plan carried out by Terraform

```shell
terraform plan

# output
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # local_file.pet will be created
  + resource "local_file" "pet" {
      + content              = "We love pets!"
      + content_base64sha256 = (known after apply)
      + content_base64sha512 = (known after apply)
      + content_md5          = (known after apply)
      + content_sha1         = (known after apply)
      + content_sha256       = (known after apply)
      + content_sha512       = (known after apply)
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/pets.txt"
      + id                   = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

> (+) symbol implies that the resource will be created

Create the resource

```shell
terraform apply
terraform show

# output
# local_file.pet:
resource "local_file" "pet" {
    content              = "We love pets!"
    content_base64sha256 = "zUA5Ip/IeKlmTQIptlp90JdMGAd8YLStDXhpGq0Bp0c="
    content_base64sha512 = "tduqTz5S8Wa3O9Ab5+g0GcGL6kMjMh61vjFcMm5KkOO5TgViAC/kBOdvYHl9qky2K99+u80z0CfCs2ExsHbjGg=="
    content_md5          = "f510a471c5dc0bcd4759ad9dc81a516f"
    content_sha1         = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
    content_sha256       = "cd4039229fc878a9664d0229b65a7dd0974c18077c60b4ad0d78691aad01a747"
    content_sha512       = "b5dbaa4f3e52f166b73bd01be7e83419c18bea4323321eb5be315c326e4a90e3b94e0562002fe404e76f60797daa4cb62bdf7ebbcd33d027c2b36131b076e31a"
    directory_permission = "0777"
    file_permission      = "0777"
    filename             = "/root/pets.txt"
    id                   = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
}
```




### Update and Destroy Infrastructure

Update the existing resource

```
resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
    file_permission = "0700"
}
```
```
terraform plan
terraform apply
```
Terraform will delete the old file and create a new file with updated arguments. This type of infrastructure is called **`immutable infrastructure`**

Delete the infrastructure completely

```shell
terraform destroy
```


