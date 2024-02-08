
[AWS managed policies for job functions ](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html)

![Screenshot from 2024-02-07 16-33-21](https://github.com/Mohsem35/DevOps/assets/58659448/b133e91c-95a5-4577-98ba-fefa38bbc560)



ASW-Cli credentials and configuration are stored inside a hidden directory

```shell
cat .aws/config/config
cat .aws/config/credentials

# syntax
aws <command> <subcommand> [options and parameters]
aws iam create-user --user-name lucy

# endpoint example
aws --endpoint http://aws:4566 iam list-user    

# help
aws help
aws <command> help
aws iam help
```


_Q: Grant mary full administrator access by making use of the policy called AdministratorAccess._
```shell
aws --endpoint http://aws:4566 iam attach-user-policy --user-name mary --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

_Q:jack and jill are developers and are part of a project called project-sapphire. Create a new IAM Group called project-sapphire-developers. Use the subcommand create-group to create the group._
```shell
aws --endpoint http://aws:4566 iam create-group --group-name project-sapphire-developers
```

_Q:Add the IAM users called jack and jill, who are developers to the new IAM Group called project-sapphire-developers_
```shell
aws --endpoint http://aws:4566 iam add-user-to-group --user-name jack --group-name project-sapphire-developers
```

_Q:What privileges are granted for jack and jill who are part of the group project-sapphire-developers? Check for their permissions individually and the ones granted to the group._

```shell
# for groups
aws --endpoint http://aws:4566 iam list-attached-group-policies --group-name project-sapphire-developers

# for individuals
aws --endpoint http://aws:4566 iam list-attached-user-policies --user-name jack
```

_Q:Both jack and jill need complete access to the EC2 service. Attach the AmazonEC2FullAccess policy with the ARN: arn:aws:iam::aws:policy/AmazonEC2FullAccess to the group project-sapphire-developers._

```shell
aws --endpoint http://aws:4566 iam attach-group-policy --group-name project-sapphire-developers  --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess
```


### IAM with Terraform

[Resource: aws_iam_user](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user)


```hcl
provider "aws" {
    region = "us-west-2"
    access_key = "AKIAI44QH8DHBEXAMPLE" 
    secret_key = "je7MtGbClwBF/2tk/h3yCo8n..."
}

resource "aws_iam_user" "admin-user" {
    name = "lucy"
    tags = {
        Description = "Technical Team Leader"
    }
}
```

This is not a recommended approach. We can save the credentials by following another 2 approach

1. save credentials at `.aws/credentials` file
2. by `export` credentials as environment variables


```shell
terraform init
terraform plan
terraform apply
```

### IAM Policies with Terraform

AdministratorAccessPolicy

Heredoc Syntax

```
[COMMAND] <<DELIMITER
  Line1
  Line2
  Line3
DELIMITER
```

```hcl
# main.tf
# create iam user lucy
resource "aws_iam_user" "admin-user" {
  name = "lucy"  
  tags = {
    Description = "Technical Team Leader"
  }
}

# create iam adminuser policy (1st approach)
resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"  
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
EOF
}

# create iam adminuser policy (2nd approach)
# create new file named 'admin-policy.json'
resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"  
  policy = file("admin-policy.json")
}

# attach user to policy
resource "aws_iam_user_policy_attachment" "lucy-admin-access" {
  user         = aws_iam_user.admin-user.name
  policy_arn   = aws_iam_policy.adminUser.arn
}


```
```json
// admin-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```


```shell
terraform init
terraform plan
terraform apply
```


### S3 with Terraform

some points about S3
1. Unique bucket name
2. DNS compliant name
3. Files size between 0 to 5TB 

web address would look like this: 

```
https://<bucket_name>.<region>.amazonaws.com
https://all-pets.us-west-1.amazonaws.com
```

```hcl
# create bucket
resource "aws_s3_bucket" "finance" { 
    bucket = "finanace-21092020"
    tags = {
        Description = "Finance and Payroll"
    }
}

# bucket object
resource "aws_s3_bucket_object" "finance-2020" { 
    content = "/root/finance/finance-2020.doc" 
    key = "finance-2020.doc"
    bucket = aws_s3_bucket.finance.id

}

resource "aws_s3_object" "upload" {
  bucket  = "pixar-studios-2020"
  key     = "woody.jpg"
  source  = "/root/woody.jpg"  # Use 'source' instead of 'content' for local file path
}


# create iam policy
data "aws_iam_group" "finance-data" { 
    group_name = "finance-analysts"
}

# s3 bucket policy
resource "aws_s3_bucket_policy" "finance-policy" {
  bucket = aws_s3_bucket.finance.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "s3:*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.finance.id}/*",
      "Principal": {
        "AWS": [
          "${data.aws_iam_group.finance-data.arn}"
        ]
      }
    }
  ]
}
EOF
}
```

```shell
terraform init
terraform plan
terraform init
```



### DynamoDB with Terraform



```hcl
# create table
resource "aws_dynamodb_table" "cars" {
  name         = "cars"
  hash_key     = "VIN"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "VIN"
    type = "S"
  }
}

# make row of tables
resource "aws_dynamodb_table_item" "car-items" {
  table_name = aws_dynamodb_table.cars.name
  hash_key   = aws_dynamodb_table.cars.hash_key

  item = <<EOF
{
  "Manufacturer": {"S": "Toyota"},
  "Make": {"S": "Corolla"},
  "Year": {"N": "2004"},
  "VIN": {"S": "4Y1SL65848Z411439"}
}
EOF
}
```

```shell
terraform init
terraform plan
terraform init
```