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
