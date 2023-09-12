[AWS Pricing Calculator](https://calculator.aws/#/addService)

[What are VPC endpoints?](https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/what-are-vpc-endpoints.html)

[IP addressing for your VPCs and subnets](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html)

[RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918)

[AWS re:Invent 2015 | (NET403) Another Day, Another Billion Packets](https://www.youtube.com/watch?v=3qln2u1Vr2E&ab_channel=AmazonWebServices)


Search `vpc` in search box -> create vpc -> resources to create(`vpc only`) ->  name tag(`vpc-a`) -> ipv4 cidr(`10.10.0.0/16`) -> create vpc 

dashboard left sidebar named `virtual private cloud` -> internet gateways -> create internet gateway -> internet gateway settings -> name tag(`vpc-a-igw`) -> create internet gateway

![Screenshot from 2023-09-11 19-47-49](https://github.com/Mohsem35/DevOps/assets/58659448/7943bffb-fe7c-455f-8393-63ec9009da11)

dashboard left sidebar named `internet gateway` ->internet gateway dashboard -> attach to a vpc -> available vpcs(our vpc) -> attach internet gateway

dashboard left sidebar named `subnets` -> create subnet -> vpc id(`vpc-a`) -> subnet 1 of 1 -> subnet name(`web-subnet-a`) -> ipv4 cidr block(`10.10.1.0/24`) -> create subnet

create ec2 vm -> name(web1) -> key-pair(poridhi.pem) -> network settings -> vpc(vpc-a) -> auto-assign public ip(`enable`) -> firewall(create security group) -> allow ssh traffic from, allow https traffic from this internet, allow http traffic from this internet -> launch instances 

দেখব vm internet access পাচ্ছে না, তাই vm এর `edit route` section যাব 

<img width="800" alt="Screenshot 2023-09-12 at 3 58 26 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d6621744-7e10-4659-8e32-61c16d222108">

আমরা যে internet gateway বানাইছিলাম, সেইটা attach করে দিব route table তে. এখন যদি আমি telnet করি vm টাকে তাহলে access করতে পারব

```
telnet <vm_public_ip> 22
traceroute <vm_public_ip>
```

এখনো যদি vm access করা না যায়, তার মানে **`ICMP`**(Internet Control Message Protocol) enable করা নাই''

ICMP জাস্ট একটা প্রোটকল, ping and pong

instances -> click on the `instance id` -> select `security tab` -> click on `security groups(launch-wizard)` -> edit inbound rules -> add rule -> type(`custom icmp - ipv4`), source(`custom anywhere ipv4`)

![Screenshot 2023-09-12 at 4 11 11 PM](https://github.com/Mohsem35/DevOps/assets/58659448/d5f79987-b556-49e9-b76e-9e631e9f3991)

এখন যদি traceroute করি, তাহলে vm access করতে পারব

```
ping <vm_public_ip>
```





dashboard left sidebar named `route tables` -> create route table -> 

অথবা 
subnet এর সাথে by default route table থাকে

dashboard left sidebar named `subnets` -> select specific subnet -> click route table -> click on `route table id` -> edit routes -> see if wverything is OK 10.10.0.0/16(local) -> create 



### Create 2nd VPC

Step 1: VPC create
Search `vpc` in search box -> create vpc -> resources to create(`vpc only`) ->  name tag(`vpc-b`) -> ipv4 cidr(`10.20.0.0/16`) -> create vpc 


Step 2: IGW create
dashboard left sidebar named `virtual private cloud` -> internet gateways -> create internet gateway -> internet gateway settings -> name tag(`vpc-b-igw`) -> create internet gateway


Step 3: Attach IGW to VPC
dashboard left sidebar named `internet gateway` ->internet gateway dashboard -> attach to a vpc -> available vpcs(our vpc) -> attach internet gateway

<img width="800" alt="Screenshot 2023-09-12 at 4 24 16 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/c978e3f6-1f33-496a-82e1-3e882333d1d4">

Step 4: Create Subnet
dashboard left sidebar named `subnets` -> create subnet -> vpc id(`vpc-b`) -> subnet 1 of 1 -> subnet name(`data-subnet-b`) -> ipv4 cidr block(`10.20.1.0/24`) -> create subnet


Step 4: Create Ec2 instance

EC2 instances -> launch instances -> name(data2) -> key-pair(poridhi.pem) -> network settings -> vpc(vpc-b) -> auto-assign public ip(`enable`) -> firewall(create security group) -> allow ssh traffic from, allow https traffic from this internet, allow http traffic from this internet -> launch instances


Step 5: Configure route table

dashboard left sidebar named `subnets` -> select specific subnet(`data-b`) -> click `route tables` -> click on `route table id` -> edit routes -> see if evrything is OK 10.20.0.0/16(local) -> destination(`0.0.0.0`), target(`iwg-...`) -> save changes

<img width="800" alt="Screenshot 2023-09-12 at 4 44 21 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/77553e88-bfb4-4d46-8ba3-ae009b840e78">


now ping from vm-1 to vm-2 through public ip and NAT gateway

কিন্তু private ip ধরে ping করলে response পাব না

- cloud resource গুলোকে নামকরণের আলাদা way আছে like variables

dashboard left sidebar named `virtual private cloud` -> peering connections -> create peering connection -> name(`vpca-vpcb`) -> vpc id(`vpc-a`)requester -> vpc id(`vpc-a`) accepter -> create peering connection 

- vpc peering এর নামগুলো শুরু হয় `pcx` দিয়ে 

এখন request accept করতে হবে `vpc a to vpc b`

<img width="800" alt="Screenshot 2023-09-12 at 5 34 21 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/a664ace1-b7c2-4db5-be0b-56def1391a43">

<img width="550" alt="Screenshot 2023-09-12 at 5 35 42 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/705c88f2-012b-4939-a291-9ba7b091e4c0">

peering on হয়ে গেল কিন্তু route করা হয় নাই, তার মানে route table এ entry দিতে হবে


ping from vm-b to vm-a

```
telnet <vm-b-private-ip> 22
```

now run tcpdump from vm-a

```
# find the interface first
ip a
```

```
sudo tcpdump -i eth0 src <vm-b-private-ip>
```
packet এখনো reach করে নাই, কারণ আমরা route define করি নাই তাই 

Step 6: Add routing to VPC to VPC

dashboard left sidebar named `virtual private cloud` -> subnets -> select `web-subnet-a` -> select `route table` tab -> click `route table`  -> select route table id -> edit routes -> add route -> destination(`10.20.0.0/16`), target(`peering connection pcx`) -> save changes


dashboard left sidebar named `virtual private cloud` -> subnets -> select `data-b` -> select `route table` tab -> click `route table`  -> select route table id -> edit routes -> add route -> destination(`10.10.0.0/16`), target(`peering connection pcx`) -> save changes
