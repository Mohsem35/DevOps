### Terraform Taint

যখন কোন কারণে resource create না হবে সেইটাকে Taint হিসেবে ধরে নেয় 

In Terraform, the terraform taint command is used to **mark a resource managed by Terraform as tainted**. When a resource is tainted, Terraform will consider it as **needing to be recreated during the next apply operation**. This means Terraform will destroy the existing resource and create a new one with the same configuration


### Terraform Debugging

Log levels check করতে হবে for debugging

info, warning, error, debug, trace. **trace** হচ্ছে সবকিছুর log show করবে. এই environment variable আমরা export করে নিয়ে then **`terraform plan`** execute করলে অনেক বেশি logs দেখতে পাব 


```shell
export TF_LOG = TRACE
```

**logs persistently save** করে রাখার জন্য 

```shell
export TF_LOG_PATH = /tmp/terraform.log
head -10 /tmp/terraform.log
```


### Terraform Import

যেই resource গুলো আগেই crete হছে without help of terraform সেগুলোকে যদি এখন terraform দিয়ে manage করতে চাই



`terraform import` is a command-line tool in Terraform that allows you to **import existing infrastructure into our Terraform state**. This is useful when you have **pre-existing resources that were not originally created or managed by Terraform**, but you **want to start managing** them using Terraform going forward.

এইটা শুধুমাত্র state file update করবে, resource update করবে না 

1st step: Resource block define করতে হবে (for existing resource) 

```hcl
resource "aws_instance" "webserver-2" {
    # (resource arguments)
}
```

Step 2: Run `terraform import` command

```shell
# terraform import <resource_type>.<resource_name> <attribute>
terraform import aws_instance.webserver-2 i-026e13....
```

Step 3: Now **define resource arguments in the block.** Inspect EC2 instance from AWS management console

```hcl
resource "aws_instance" "webserver-2" { 
    ami = ...
    instance_type = ...
    key_name = ...
    vpc_security_group_ids = ["..."]
}
```
```shell
terraform plan
terraform apply
```