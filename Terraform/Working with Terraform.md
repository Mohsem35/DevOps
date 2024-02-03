### Terraform Commands



```shell
# syntax validation in configuration file
terraform validate

# fomat code in canonical format
terraform fmt

# current state of the structure
terraform show

# list of all providers plugins
terraform providers

# copy provider plugins needed for current configuration
terraform providers mirror /directory/file/name

# sell all outputs
terraform output
terraform output <variable_name>

# update state file
terraform refresh
or 
terraform plan
or
terraform apply

# visual representation of terraform execution plan (graphviz)
apt update -y
apt install graphviz -y
terraform graph | dot -Tsvg > graph.svg
```


### Mutable vs Immutable Infrastructure

Terraform follows **immutable infrastructure** structure

means Terraform will first delete the original file of `old_version` and create new resource with `new_version` original file


### LifeCycle Rules

#### Create Before Destroy

This rule ensure that when a change in configuration forces the resiurce to be recreated, **new resource is created first before deleting the old one**.

```hcl
resource "local_file" "pet" { 
    filename = "/root/pets.txt" 
    content = "We love pets!"
    file_permission = "0700"
    
    lifecycle {
        create_before_destroy = true
    }
}
```

#### Prevent  Destroy

যদি old resource destroy করতে না চাই at all

Terraform will reject any changes that will result in the resource getting destroyed and it will display an error message 

```hcl
resource "local_file" "pet" { 
    filename = "/root/pets.txt" 
    content = "We love pets!"
    file_permission = "0700"
    
    lifecycle {
        prevent_destroy = true
    }
}
```

The resource can still be destroyed if we make use of the `terraform destroy` command

#### Ignore Changes

This lifecycle rule will **prevent a resource from being updated**



```hcl
resource "aws_instance" "webserver" {
    ami= "ami-0edab43b6fa892279"
    instance_type = "t2.micro" 
    tags = {
        Name = "ProjectA-Webserver"
    }
    lifecycle {
        ignore_changes = [
            tags,ami
        ]           
    }
}
```

In this configuration, we are telling Terraform to not make changes in the `tags` attribute 


### Data Sources

Data sources **allow Terraform to read attributes** from resources which are **provisioned outside** it's control

মানে Terraform ছাড়া আমরা manually যদি কোন resource provisioned করে থাকি যেইটা out scope of Terraform সেইটা **read করতে গেলে** `data source` লাগে 

Suppose, আমি Terrafrom দিয়ে `pets.txt` file provisioned করেছি এবং manually `touch` command দিয়ে `dogs.txt` file provisioned করলাম। তাহলে `dogs.txt` file is **out of scope for Terraform**

<img width="650" alt="Screenshot 2024-02-02 at 11 19 15 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/0c6e0c9a-55c5-4664-ae1e-eac3aa037a5b">


কিন্তু চাইলে আমরা `dogs.txt` নিয়ে কাজ করতে পারি with Terraform

```hcl
resource "local_file" "pet" {
    filename = "/root/pets.txt" 
    content = data.local_file.dog.content
}

data "local_file" "dog" {
    filename ="/root/dog.txt"
}
```




### Meta Arguments

যদি same resource এর multiple instance create করতে চাই তবে 

Meta Arguments can be used in any resource block to change the behvior of resources

1. `depends_on`
2. `lifecycle` rules

These are also meta arguments

### Count (Meta Arguments)

Count argument **`list`** নিয়া কাজ করে 

One of the easiest ways to **create multiple instances** of the local file is to make use of the **`count`** meta-argument



```hcl
# variables.tf
variable "filename" {
    default = "/root/pets.txt"
    default = "/root/dogs.txt"
    default = "/root/cats.txt"
    default = "/root/cows.txt"
    default = "/root/ducks.txt"
}
```
**৩** টা ফাইল make হবে for using **count attribute**

We will use **`length function`** here

```hcl
# main.tf
resource "local_file" "pet" {
    filename = var.filename[count.index]
    //count = 3
    count = length(var.filename)  // this will create as many files as declared in variables.tf
}
```


### for_each

**`for_each`** argument only works with a **map** or a **set**

```hcl
# variables.tf
variable "filename" {
    type = set(string) // 1st approach cause for_each only works with set
    default = [
        "/root/pets.txt"
        "/root/dogs.txt"
        "/root/cats.txt"
    ]
}
```

```hcl
# main.tf
resource "local_file" "pet" {
    filename = each.value
    for_each = var.filename
    //for_each = var.filename = toset(var.filename)   2nd approach
}
```
