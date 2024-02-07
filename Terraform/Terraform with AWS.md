
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
