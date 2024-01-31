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

<img width="541" alt="Screenshot 2024-01-28 at 11 45 04 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9ae658e6-41ad-4468-8ca5-4e49b4cbd12a">

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

Set: Similar to the list. Difference between set and list is set can't have duplicate elements