## Cloud Concepts

2 টা core components দিয়ে cloud বানানো possible
1. VXLAN
2. Opne vSwitch

- On premise pc এর সাথে cloud এর কনেক্ট হবে **`BGP(border gatweway protocol)`** এর মাধ্যমে
- Overlay network দিয়ে multiple container কে কিভাবে add করা যায় শিখানো হয়েছে
- VPC region boubder হয়। VPC, **`multi-region`** তে span করা যায় **`না`**। অর্থাৎ, VPC কেবল একটা region তে deploy করা যায়, multi-region তে deploy করা যায় না

Q. Cloud এ যেকোন resource deploy করতে হলে, 1st requirment কি? - VPC বানাতে হবে

Q. VPC টা কোথায় deploy করব? - customer কোন location এ আছে

Q. একটা region এ database আছে, আরেকটা region এ কিভাবে data replicate করব? - possible না 

যেকোন cloud এর ২ টা part থাকে
1. **`compute cluster`**: এখানে শুধু computer server থাকে
2. **`storage cluster`**: SSD/HDD

এরা যদি আলাদা region এ থাকে, তবে latency হবে। তাই, same region, AZ তে application এর সবকিছু থাকলেই ভাল

- VPC বানানোর পরে **`multiple segment`** বানাতে হয়। multiple segment কে **`subnet`** বলে
- প্রতিটা data center কে বলা হয় **`AZ(availabilty zone)`**
- প্রতিটা data center আবার **`physical wire`** দিয়ে নিজেরা connected 
- Multiple AZ(availabilty zone)/Data Center নিয়ে **`region`** গঠিত হয়

![Untitled-2023-07-28-1054](https://github.com/Mohsem35/DevOps/assets/58659448/ae38ced6-3316-4f78-b69c-3ed6008ed19f)

- একটা EC2, একি AZ(avialability zone) এর EBS কে connect করার try করবে।


## Virtual Private Cloud (VPC) 

Virtual Private Cloud (VPC) provides **`networking functionality`** to Compute Engine virtual machine (VM) instances, Google Kubernetes Engine (GKE) clusters, and the App Engine flexible environment. VPC provides networking for your **`cloud-based resources and services`** that are global, scalable, and flexible.


### VPC networks

You can think of a VPC network the same way you'd think of a **`physical network`**, except that it is **`virtualized within Google Cloud`**. A VPC network is a **`global resource`** that consists of a list of regional virtual subnetworks (subnets) in data centers, all connected by a global wide area network. VPC networks are logically isolated from each other in Google Cloud.

![rsz_vpc-overview-example](https://github.com/Mohsem35/DevOps/assets/58659448/85e5755d-7d85-4ff1-b097-5dc2c482731f)


A VPC network does the following:

- Provides connectivity for your _Compute Engine virtual machine (VM) instances_, including _Google Kubernetes Engine (GKE) clusters_, _App Engine flexible environment instances_, and other Google Cloud products built on Compute Engine VMs.
- Offers built-in internal passthrough **`Network Load Balancers and proxy systems`** for internal Application Load Balancers.
- Connects to **`on-premises networks`** by using **`Cloud VPN tunnels and VLAN`** attachments for Cloud Interconnect.
- Distributes traffic from Google Cloud external load balancers to backends.


> **_NOTE:_** Projects can contain multiple VPC networks. Unless you create an organizational policy that prohibits it, new projects start with a default network (an auto-mode VPC network) that has one subnetwork (subnet) in each region.


### VPC networks Specifications

VPC networks have the following properties:

- _VPC networks_, including their associated _routes and firewall rules_, are **`global resources`**. They are not associated with any particular region or zone.
- Subnets are **`regional resources`**
- Each subnet defines a range of IPv4 addresses
- _Traffic to and from instances_ can be controlled with network **`firewall rules`**. Rules are implemented on the VMs themselves, so traffic can only be controlled and logged as it leaves or arrives at a VM.
- Resources within a VPC network can communicate with one another by using internal IPv4 addresses
