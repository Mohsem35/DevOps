### VPC Peering

VPC peering (Virtual Private Cloud peering) is a networking feature offered by cloud service providers like Amazon Web Services (AWS) and Google Cloud Platform (GCP).
It allows you to connect two **`VPCs`**(Virtual Private Clouds) located in the **`same or different regions`** within the same cloud provider's infrastructure, 
enabling them to **`communicate with each other`** as if they were part of the same network.

#### Step 1: Create a VPC Network for APIOne

```
Name: vpc-apione
New Subnet name: subnet-apione
Region: us-central1
IPv4 range: 192.168.0.0/24
IPV4 FIREWALL RULES: Allow all
```
- মানে সব ধরনের ingress allow করতেছি এখানে
- আমরা যে ping করি, সেইটা ICMP protocol
- tcp allow করে দিচ্ছি

#### Step 2: Create another VPC Network for APITwo

```
Name: vpc-apitwo
New Subnet name: subnet-apitwo
Region: us-east1
IPv4 range: 10.10.0.0/24
IPV4 FIREWALL RULES: Allow all
```

#### Step 3: Create a VM inside APIOne VPC Network

Search `compute engine` in search box
```
Name: vm-apione
Region: us-certral1
Zone: us-certral1-a
Machine Configuration series: E2
Firewall: Allow both HTTP & HTTPS traffic
Advanced options Networking:
  Network interfaces:
    Network: vpc-apione
    Subnetwork: subnet-apione IPv4 (198.168.0.0/24)
    External IPv4 addresses: Ephemeral
```

#### Step 4: Create another VM inside APITwo VPC Network


```
Name: vm-apitwo
Region: us-east1
Zone: us-east1-b
Machine Configuration series: E2
Firewall: Allow both HTTP & HTTPS traffic
Advanced options Networking:
  Network interfaces:
    Network: vpc-apitwo
    Subnetwork: subnet-apitwo IPv4 (10.10.0.0/24)
    External IPv4 addresses: Ephemeral
```

#### Step 5: Install the following commands on both VM(differnet region VPC)

```
sudo apt update -y
sudo apt install telnet -y
sudo apt install tcpdump -y
sudo apt install iputils-ping
```

#### Step 6: Establish peering connections between 2 different region VPCs

- peering ২ সাইড থেকেই করতে হবে
- peering communication 2 সাইড থেকে **`না`** হলে, **`status == inactive`** দেখাবে

VPC network -> VPC network peering -> CREATE CONNECTION -> CONTINUE -> CREATE
```
Name: vpc-api1-vpc-api2
Your VPC network: vpc-apione
VPC network name: vpc-apitwo
```

```
Name: vpc-api2-vpc-api1
Your VPC network: vpc-apitwo
VPC network name: vpc-apione
```

<img width="800" alt="Screenshot 2023-08-03 at 12 15 35 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e38c8823-a09b-48f9-831e-078fe259da18">

#### Step 7: Ping private IP from one VM to another VM

vm-apione IP : 192.168.0.2
vm-apitwo IP : 10.10.0.2

```
# From VM 1
ping 10.10.0.2
```
```
# From VM 2
ping 192.168.0.2
```

#### Step 7: Install nginx in vm-apione

```
sudo apt install nginx
sudo systemctl status nginx
```

#### Step 8: telnet/wget from vm-apitwo
```
# 1st try
telnet <vm_apione_privateip> 80
```

```
# 2nd try
wget <vm_apione_privateip> 80
```

#### Step 9: Check 80 port of vm-apione through tcpdump

```
sudo tcpdump -i ens4 -v port 80
```




