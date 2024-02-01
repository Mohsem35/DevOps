### Using Terraform Providers

After writing Terraform configuration file, `terraform init` command (within the configuration directory file) downloads and installs plugins for the providers within the configuration.

The providers can be aws, azure or local providers

Terraform uses plugin-based architecture. Terraform providers are distributed by HashiCorp and are publicly available in the Terraform Registry. 

There are 3 tires of providers

1. **Official provider**: Owned and maintained by HashiCorp
2. **Partner provider**: Owned and maintained by third-party technology company and gone through partner provider process with HashiCorp
3. **Community providers**: HashiCorp community is responsible

Plugins are downloaded in hidden directory

```shell
ls /root/terraform-local-file/.terraform 
```

### Configuration Directory

যেই directory তে `.tf` extension সহ Terraform এর configuration ফাইল পাওয়া যাবে সেইটাই configuraton directory

<img width="500" alt="Screenshot 2024-01-28 at 11 45 04 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9ae658e6-41ad-4468-8ca5-4e49b4cbd12a">

একটা singel configuration ফাইলে multiple configuration blocks থাকতে পারে এবং সেইটার নাম হবে **`main.tf`**

### Multiple Providers

একটা `main.tf` ফাইলে multiple providers থাকতে পারে  

`Random Provider` allows us to create random resources such as random ID, password rtc. It is a logical provider 

```hcl
# main .tf
resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
}

resource "random_pet" "my-pet" {
  prefix = "Mrs"
  seperator = "."
  length = "1"
}
```
```shell
# plugin for the random provider will be installed 
terraform init
terraform plan
terraform apply
```


### Define Input Variables

We don't want to use hardcode variables. We want to make sure that the same code can be used again and again to deploy resources based on a set of input variables that can be provided during the execution.


```hcl
# variables.tf
variable "filename" {
    default = "/root/pets.txt"
}

variable "content" {
    default = "We love pets!"
}

variable "prefix" {
    default = "Mrs"
}

variable "separator" {
    default = "."
}

variable "length" {
    default = "1"
}
```
Now, use the variables in the main configuration file

```hcl
# main .tf
resource "local_file" "pet" {
    filename = var.filename
    content = var.content
}

resource "random_pet" "my-pet" {
  prefix = var.prefix
  seperator = var.separator
  length = var.length
}
```

```shell
terraform inti
terraform plan
terraform apply
```

### Understanding the Variable Block

The variable block in Terraform access 3 parameters

1. `default` parameters
2. `type` = string, number, bool, any
    -  addtional types are list, map, object, tuple
      
<img width="350" alt="Screenshot 2024-01-29 at 7 54 34 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/fed213f6-6e34-453e-ae90-9b1f5bcaeeeb">

- Example of `List` variable

<img width="600" alt="Screenshot 2024-01-29 at 7 57 27 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/486b61da-de4b-493d-a1a7-614b5cf372a3">

List of `type`

<img width="600" alt="Screenshot 2024-01-29 at 8 02 08 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9827c83d-9a89-4b65-9677-e5cc5e69049b">


- Example of `Map` variable

<img width="600" alt="Screenshot 2024-01-29 at 8 00 24 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/caea535d-a133-4466-88e4-2f7b2aa221bb">





3. `description`

`type` parameter হচ্ছে optional। By default হচ্ছে `any`, যদি type declare করা না হয়ে থাকে   

```hcl
# variables.tf
variable "filename" {
    default = "/root/pets.txt"
    type = string
    description = "the path of local file"
}
```

List: A list is a numbered collection of values. First element of the list at index 0

Map: A Map is data represented in the format of key-value pairs. `default` curly braces এর মধ্যে multiple key-value pair declare করতে পারি 

Set: Similar to the list. **Difference between `set` and `list` is set can't have duplicate elements**


### Using Variables in Terraform

#### Command line flags

```shell
terraform apply -var "filename=/root/pets.txt" -var "content=We lovePets!" -var "prefix=Mrs" -var "separator=." -var "length=2"
```

With this method, we can pass as many variables as we want by using `-var` flag

#### Environment variables

```shell
$ export TF_VAR_filename="/root/pets.txt"
$ export TF_VAR_content="We love pets!"
$ export TF_VAR_prefix="Mrs"
$ export TF_VAR_separator="." 
$ export TF_VAR_length="2"
$ terraform apply
```

We can declare environment variables by using `TF_VAR_` followed by the name of a declared variable like this.

#### Variable Definition Files

Finally, when we are dealing with a lot of variables we can load values by making use of variable definition files like this.

এই variable definition ফাইলের নাম যেকোন কিছু হতে পারে কিন্তু `.tfvars` অথবা `.tfvars.json` extension থাকতে হবে 

Automatically Loaded = `*.auto.tfvars` or `*.auto.tfvars.json`

```shell 
# terraform.tfvars
filename = "/root/pets.txt"
content = "We love pets!"
prefix = "Mrs"
separator = "." 
length = "2"
```
```shell
terraform apply
```

যদি variable definition ফাইলের নাম custom হয়, তবে 

```shell
terraform apply -var-file customname.tfvars
```

##### Variable definition precedence

Number 4 is the highest priority and number 1 has the least


<img width="500" alt="Screenshot 2024-02-01 at 12 38 39 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9ee77d7c-7dec-4d55-bf5b-442f1709ad8f">


### Resource Attributes Reference


**Link one resource to another using resource attributes**

There are bound to be multiple resources that are dependent on each other

We want to make use of the **output of one resource** of one resource and use it **as an input for another one**

একটা resource, আরেকটা resource কে use করতে গেলে always **id** use করবে **for reference prurpose**

`file` resource will use the id of `pet` rersource, তাহলে terraform প্রথমে `random_pet` resource create করবে পরে `local_file` resource create করবে 

```hcl
resource "local_file" "pet" {
    filename = var.filename
    content = "My favorite pet is ${random_pet.my-pet.id}"
}

resource "random_pet" "my-pet" {
    prefix = var.prefix
    separator = var.separator
    length = var.length
}
```

```shell
terraform apply 
```


### Resource Dependencies

1. **Implicit Dependency**: `local_file` resource যেমন `random_pet` resource এর উপর dependent. `terraform destroy` command apply করলে 1st `local_file` then `random_pet` resource destroy হবে 

2. **Explicit Dependency**: `depends on` keyword টা declare করে দেই এতে আমরা 

এইটা ensure করবে যে, `local_file` resource টা `random_pet` resource এর পরের create হবে 

```hcl
resource "local_file" "pet" {
    filename = var.filename
    content = "My favorite pet is Mr.cat"
    depends_on = [
        random_pet.my-pet
    ]
}

resource "random_pet" "my-pet" {
    prefix = var.prefix
    separator = var.separator
    length = var.length
}
```

[tls_private_key (Resource) official documentation](https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key)

### Output Variables

When we want to **display quickly details about a provision resource details on screen** or to feed the output variables to other IaC tools like Ansible 


```hcl
resource "local_file" "pet" {
    filename = var.filename
    content = "My favorite pet is Mr.cat"
    depends_on = [
        random_pet.my-pet
    ]
}

resource "random_pet" "my-pet" {
    prefix = var.prefix
    separator = var.separator
    length = var.length
}

output pet-name {
    value =  random_pet.my-pet.id
    description = "Record the value of pet ID generated by the random_pet resource"
}
```

These variables can be used to store the value of an expression in Terraform

To print the value of all outputs variables

```shell
terraform output

# To print the value of an existing output variable 
terraform output pet-name
```

