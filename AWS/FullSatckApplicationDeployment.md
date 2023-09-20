AWS region: us-east-1

Step 1: Create VPC

- private subnet এর instances গুলো update করার জন্য internet access লাগবে, তার মানে এখানে `NAT gateway` লাগবে
- AWS এর `services` and `instances` গুলো নিজেরদের মধ্যে communicate করার জন্য **`vpc endpoints`** use করে, এতে **`bill কম আসবে`**। এই একই কাজটা public internet এর throough তে
  করতে গেলে NAT gateway use করতে হইত, তখন bill অনেক বেশি আসত
- AWS এর সার্ভিস use করতে গেলে `vpc endpoints` লাগবেই


search `vpc` in search box -> VPCs -> create vpc -> resources to create(`vpc and more`), name tag auto-generation(`fullstack`), ipv4 cidr block(`10.0.0.0/16`), 
number of availability zones(`2`), number of public subnets(`2`), number of private subnets(`2`), nat gateways(`In 1 AZ`), vpc endpoints(`none`) -> create vpc



Dashboard -> EC2 -> EC2 Dashboard -> click on instances(running) -> click on launch instances -> name and tags(`lb-1`) -> application and os images(`ubuntu`)
-> instance type(`t2.micro`) -> Key pair(`processed without  a key pair`) -> network settings -> vpc(`fullstack-vpc`), subnet(`fullstack-subnet-public1-us-east-1a`)
, auto-assign public ip(enable) -> launch instances

```
sudo apt update -y
sudo apt install nginx -y
sudo systemctl status nginx  
```
