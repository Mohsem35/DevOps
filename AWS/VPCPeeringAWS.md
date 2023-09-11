[AWS Pricing Calculator](https://calculator.aws/#/addService)

[What are VPC endpoints?](https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/what-are-vpc-endpoints.html)

[IP addressing for your VPCs and subnets](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html)

[RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918)


Search `vpc` in search box -> create vpc -> resources to create(`vpc only`) ->  name tag(`vpc-a`) -> ipv4 cidr(`10.10.0.0/16`) -> create vpc 

dashboard left sidebar named `virtual private cloud` -> internet gateways -> create internet gateway -> internet gateway settings -> name tag(`vpc-a-igw`) -> create internet gateway

![Screenshot from 2023-09-11 19-47-49](https://github.com/Mohsem35/DevOps/assets/58659448/7943bffb-fe7c-455f-8393-63ec9009da11)

dashboard left sidebar named `internet gateway` ->internet gateway dashboard -> attach to a vpc -> available vpcs(our vpc) -> attach internet gateway

dashboard left sidebar named `subnets` -> create subnet -> vpc id(`vpc-a`) -> subnet 1 of 1 -> subnet name(`web-subnet-a`) -> ipv4 cidr block(`10.10.1.0/24`) -> create subnet

create ec2 vm -> name(web1) -> key-pair(poridhi.pem) -> network settings -> vpc(vpc-a) -> auto-assign public ip(`enable`) -> firewall(create security group) -> allow ssh traffic from, allow https traffic from this internet, allow http traffic from this internet -> launch instances 


```
cd 
```

dashboard left sidebar named `route tables` -> create route table -> 

অথবা 
subnet er sathe by default route table thake.

dashboard left sidebar named `subnets` -> select specific subnet -> click route table -> click on `route table id` -> edit routes -> see if wverything is OK 10.10.0.0/16(local) ->
