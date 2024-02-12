### Remote State and State Locking


**Remote State:** Remote state refers to **storing Terraform's state files in a remote location** rather than locally on the machine where Terraform commands are run. Storing state remotely is beneficial for collaboration among team members and for maintaining consistency across multiple environments. When you use remote state, Terraform stores information such as resource IDs, metadata, and dependencies in a backend storage system, such as Amazon S3, Azure Blob Storage, Google Cloud Storage, or a Terraform Enterprise instance.


**State Locking:** State locking is a mechanism used to **prevent concurrent modifications to Terraform state**. When multiple users or automation processes are working with the same Terraform configuration, there is a risk of concurrent state modifications, which can lead to conflicts, corruption, or loss of data. State locking prevents these issues by locking the state file when a Terraform operation is initiated, such as terraform apply or terraform destroy.

State locking typically **involves acquiring a lock on the remote state file** before performing any modifications and releasing the lock once the operation is complete. This prevents other users or processes from modifying the state file simultaneously. If a lock cannot be acquired, Terraform will wait for a specified timeout period before exiting with an error, ensuring that only one process can modify the state at a time.


### Remote Backends with S3

আমরা যদি state file অন্য কোথাও save করে রাখতে চাই, তাহলে নিচের approach follow করতে পারি 


We want to configure a remote backend for storing the state file

`key` is an S3 object part where the state file should be stored. In this case, we want to store the terraform state file within a directory called `finance`

`tfstate` ফাইল locally create করে পরে, remote S3 তে `tfstate` ফাইল object হিসেবে save করে রাখতে পারি 

```hcl
# main.tf
resource "local_file" "pet" {
filename = "/root/pets.txt"
content = "We love pets!"
}
```
```hcl
# terraform.tf
terraform {
    backend "s3" {
        bucket = "kodekloud-terraform-state-bucket01"
        key = "finance/terraform.tfstate"
        region = "us-west-1"
        dynamodb_table = "state-locking"
    }
}
```

```shell
terraform init
terraform apply
```


### Terraform State Commands

Terraform state file is stored at JSON format and it shuld not be edited manually

**Subcommand:** `list`, `mv`, `pull`, `rm`, `show`

```shell
terraform state <subcommand> [options] [args] 

# list all the resources recorded within terrraform state file
terraform state list

# get detailed information about resource from state file
terraform state show aws_s3_bucket.finance-2020922

# move items in a terraform state file
# moving a resource from its current resource address to another
# renaming a resource
terraform state mv [options] SOURCE DESTINATION

# suppose dynamodb তে table name change করতে চাচ্ছি তাহলে following command use করব 
# just table name change করব(state-locking to state-locking-db), contents in table remain same
terraform state mv aws_dynamodb_table.state-locking aws_dynamodb_table.state-locking-db


# download and display remote state file
terraform state pull

# delete items from terraform state file
terraform state rm ADDRESS
terraform state rm aws_s3_bucket.finance-2020922
```


resource removed from state file are not actually destroyed from the real world infrastructure   