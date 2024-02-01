### Introduction to Terraform State

_Q: How does Teraform know that the local file resource already exists ?_

configuration directory তে গেলে **`terraform.tfstate`** নামের একটা ফাইল পাওয়া যাবে, এইটাই **terraform state** file which is created as a consequence of the `terraform apply` command

The state file is a **JSON data structure** that maps the real-world infrastructure resources t0 the resource definition in the configuration files. terraform state ফাইল কে isnpect করলে দেখব যে it has the **complete record of the infrastructure** created by Terraform

configuration ফাইলে কোন কিছু change করে `terraform plan/terraform apply` command execute করলে state ফাইল **automatically refresh** হবে 


### Purpose of State

A **state file** can be considered to be a **blueprint** of all the resources. Every resource would have a **unique ID** which is used to identify the resources.

State file is a **record of truth** without having to reconcile and also **tracks metadata details**

Terraform **stores a cache of attribute values** for all resources in the state

**Every user in the team** should always have the **latest state** data before running Terraform and make sure that **nobody** else runs Terraform at the **same time**

> Best practice is to save a copy of state file at remote server like S3, Terraform Cloud 

_Q: Which option should we use to disable state?_

We can't disable state