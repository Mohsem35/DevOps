[AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html)

[AWS Create a subnet](https://docs.aws.amazon.com/vpc/latest/userguide/create-subnets.html)

[Default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html)

[AWS Configure route tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)

[Associate a subnet with a route table](https://docs.aws.amazon.com/vpc/latest/userguide/WorkWithRouteTables.html#AssociateSubnet)

[AWS — Difference between Internet Gateway and NAT Gateway](https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6)


- AWS তে VPC বানানোর সাথে সাথে subnet বানানো লাগে, মানে **`CIDR`** দেয়া লাগে।
- VPC এর under এ প্রতিটা subnet এর জন্য ও CIDR দেওয়া লাগবে এবং **`subnet গুলোর CIDR, VPC CIDR থেকে ছোট হতে হবে`**
- VPC এর মধ্যে (L2 level) `switch` বানানো মানে **`subnet`** বানানো
  
Ex - 
```
VPC CIDR: 10.11.0.0/16
subnet1 CIDR: 10.11.1.0/24
subnet2 CIDR: 10.11.1.0/24
```


**`IGW(Internet Gateway)`**: Internet Gateway is a horizontally scalable, redundant, and highly available **`VPC component`** that allows communication between instances in your **`VPC and the Internet`**. It, therefore, acts as a **`bridge`** between your VPC and the Internet.

An Internet Gateway is **`not automatically created`** when you create a VPC. Instead, you must **`create and attach`** an Internet Gateway to your VPC before your instances in the VPC can communicate with the Internet

[What is an Internet Gateway in AWS?](https://ercanermis.com/what-is-an-internet-gateway-in-aws/)

- AWS তে VPC বানানোর পরে, সেই VPC এর সাথে internet connectivity দেয়ার জন্য IGW লাগে


**`SG(Security groups)`**: A security group acts as a **`firewall`** that controls the traffic allowed to and from the resources in your virtual private cloud (VPC). You can choose the **`ports and protocols`** to allow for inbound traffic and for outbound traffic.

- SG এর একটা rule কে multiple resource এর সাথে attach করতে পারি। resource বলতে compute resource বুঝাচ্ছে like `vm`, `load balancer`, `DB`
- **`GCP তে যেইটা Firewall Rules`** সেইটাই AWS তে সেইটাই SG(Security groups)
- GCP তে আমরা `Firewall Rules` টা `network tag` এর সাথে attach করতাম SG(Security groups) তে কোন **`network tag থাকে না`**
