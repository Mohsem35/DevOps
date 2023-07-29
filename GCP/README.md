## Cloud Concepts

2 টা core components দিয়ে cloud বানানো possible
1. VXLAN
2. Opne vSwitch

![Untitled-2023-07-29-1955](https://github.com/Mohsem35/DevOps/assets/58659448/89c32513-57ee-449d-8370-db4702deb5f0)

- একটা network আরেকটা network এর সাথে connect করতে BGP লাগে
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
- _Subnets_ are **`regional resources`**
- Each subnet defines a range of IPv4 addresses
- _Traffic to and from instances_ can be controlled with network **`firewall rules`**. Rules are implemented on the VMs themselves, so traffic can only be controlled and logged as it leaves or arrives at a VM.
- Resources within a VPC network can communicate with one another by using internal IPv4 addresses
- Instances with internal IPv4 or IPv6 addresses can communicate with **`Google APIs and services`**.
- _Network administration_ can be secured by using **`Identity and Access Management (IAM)`** roles.
- An **`organization`** can use **`Shared VPC`** to keep a VPC network in a common host project. Authorized IAM principals from other projects in the same organization can create resources that use subnets of the Shared VPC network.
- VPC networks can be _connected to other VPC networks_ in different projects or organizations by using **`VPC Network Peering`**
- VPC networks can be securely connected in _hybrid environments_ by using **`Cloud VPN`** or **`Cloud Interconnect`**
- VPC networks support **`GRE`** traffic, including traffic on Cloud VPN and Cloud Interconnect. VPC networks do **`not`** support GRE for Cloud NAT or for forwarding rules for **`load balancing`** and **`protocol forwarding`**. Support for GRE allows you to terminate GRE traffic on a VM from the internet (external IP address) and Cloud VPN or Cloud Interconnect (internal IP address). The decapsulated traffic can then be forwarded to a reachable destination. GRE enables you to use services such as Secure Access Service Edge (SASE) and SD-WAN.
- VPC networks support IPv4 and IPv6 **`unicast`** addresses. VPC networks **`do not support`** broadcast or multicast addresses within the network.

### VPC Organization policy constraints

Each new project starts with a **`default VPC network with auto mode`** . You can **`disable`** the creation of default networks by **`creating an organization policy`** with the `compute.skipDefaultNetworkCreation` constraint. Projects that inherit this policy won't have a default network.


### VPC Subnet creation mode
Google Cloud offers **`two types`** of VPC networks, determined by their subnet creation mode:

1. When an **`auto mode VPC network`** is created, one subnet from each region is automatically created within it. These automatically created subnets use a set of **`predefined IPv4 ranges`** that fit within the `10.128.0.0/9 CIDR block`. As new Google Cloud regions become available, new subnets in those regions are automatically added to auto mode VPC networks by using an IP range from that block. In addition to the automatically created subnets, you can **`add more subnets manually`** to auto mode VPC networks in regions that you choose by using IP ranges **`outside`** of `10.128.0.0/9`. The **`default network`** is an auto mode VPC network with pre-populated IPv4 firewall rules

3. When a **`custom mode VPC network`** is created, no subnets are automatically created. This type of network provides you with complete control over its subnets and IP ranges. You decide which subnets to create in regions that you choose by using IP ranges that you specify.

**`You can switch`** a VPC network from **`auto mode to custom mode`**. This is a one-way conversion; but custom mode to auto mode VPC networks **`cannot be changed`**. 


#### Considerations for auto mode VPC networks

#### Auto Mode:
- Having subnets automatically created in each region is useful.
- The predefined IP ranges(10.128.0.0/9 CIDR block) of the subnets do not overlap with IP ranges that you would use for different purposes

#### Custom Mode:

- Custom mode VPC networks are more flexible and are better **`suited to production`**
- You need **`complete control`** over the subnets created in your VPC network, including regions and IP address ranges used
- You plan to **`connect VPC network to another network`**
  - Because the subnets of _every auto mode VPC network use the same predefined range of IP addresses_, you can't connect auto mode VPC networks to one another by using VPC Network Peering or Cloud VPN
  - Because the auto mode 10.128.0.0/9 CIDR range is part of the commonly-used RFC 1918 address space, _networks outside of Google Cloud might currently or in the future use an overlapping CIDR range_
- You want to **`create subnets with IPv6 ranges`**. _Auto mode VPC networks do not support dual-stack subnets_

### Routes and firewall rules

#### Dynamic routing mode
Each VPC network has an associated _dynamic routing mode_ that controls the behavior of all of its **`Cloud Routers`**. Cloud Routers manage BGP sessions for **`Google Cloud connectivity products`**

#### Route advertisements and internal IP addresses
The following IP addresses are advertised within a VPC network:

- **`Regional internal IPv4 addresses`**
  - Used for primary and secondary IPv4 subnet address ranges

- **`Regional internal and external IPv6 addresses`**
  - Used for internal and external IPv6 subnet address ranges

- **`Global internal IPv4 addresses`**
  - Used for Private Service Connect endpoints for Google APIs

If you connect VPC networks using **`VPC Network Peering`**, subnet ranges using private IPv4 addresses are always **`exchanged`**. You can control whether subnet ranges using privately used public IPv4 addresses are exchanged. Global internal IPv4 addresses are never exchanged using peering.

When you **`connect a VPC network to another network`**, such as an on-premises network, using a Google Cloud connectivity product like Cloud VPN, Cloud Interconnect, or Router appliance:

- You can advertise the VPC network's internal IP addresses to another network (such as an on-premises network).
- Though connectivity between a VPC network and another network (such as an on-premises network) can use private routing provided by a Google Cloud connectivity product, the other network's IP addresses might also be publicly routable. Keep this in mind if an on-premises network uses publicly routable IP addresses.
- VM instances in a VPC network containing subnet ranges with privately used public IP addresses are not able to connect to external resources which use those same public IP addresses.
- Take extra care when advertising privately used public IP addresses to another network (such as an on-premises network), especially when the other network can advertise those public IP addresses to the internet.

#### Firewall rules
Both **`hierarchical firewall policies`** and **`VPC firewall rules`** apply to _packets sent to and from VM instances_ (and resources that depend on VMs, such as Google Kubernetes Engine nodes). Both types of firewalls control traffic even if it is between VMs in the same VPC network.


To monitor which firewall rule allowed or denied a particular connection, see **`Firewall Rules Logging`**

#### Private Google Access কি?

Private Google Access enabled allows VM instances that only have internal IP addresses (no external IP addresses) to reach the external IP addresses of Google APIs and services.

আমার VPS এর কোন server instance(VM) থেকে Google এর সার্ভিস গুলো use করতে চাইলে, আমরা internet দিয়ে না গিয়ে **`Private Google Access`** দিয়ে Google এর সার্ভিস গুলো reach করতে পারি। 

## Practice

#### How to create GCP VPC with subnet by ClickOps

GCP left-sidebar -> VPC network -> VPC networks -> Click `+` button CREATE VPC NETWORK -> Give a VPC name -> Select `custom` in 'Subnet creation mode' section -> Give a subnet `Name` in 'New subnet' section -> Select `region` in 'New subnet' section -> Give `IPv4 range` in 'New subnet' section -> Create

- একটা VPC এর under এ multiple subnet থাকতে পারে
- একটা subnet এর একই সার্ভারে web, database থাকা bad practice। কারণ, তখন এরা নিজেদের মধ্যে resource নিয়ে মারামারি করবে। যদি ২ টা ভিন্ন সার্ভারে web আর database থাকে তাহলে আর কোন প্রব্লেম নাই
- **`mtu-1460`** মানে প্রতিটা প্যাকেটের সাইজ 1460 এর বেশি হবে না

#### Check করি Route তৈরি হইছে কিনা

GCP left-sidebar -> VPC network -> Routes -> 'Route Management' tab 

Q. Destination IP যদি same থাকে, packet কোন interface দিয়ে বের হবে? যেই interface **`priority`** বেশি set করা 


#### New Route তৈরি করব for specific IP/VM/VPN

GCP left-sidebar -> VPC network -> Routes -> Click `+` button 'CREATE ROUTE' -> Give `Name` -> Select `Network` -> Choose `Destination IPv4 range` -> Choose your **`Next hop`**

<img width="750" alt="Screenshot 2023-07-29 at 9 26 15 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/2999046d-9315-4938-8aad-7c035317acac">


#### Cloud Routers(Hybrid Connectivity) কি?

- **`Multi-cloud networking`** করতে হলে like AWS to Azure তে যাইতে চাইলে **`VPN tunnel/Cloud Routes`** লাগে
- Same cloud এ networking করতে চাইলে লাগে **`Peering Connection`**. AWS to AWS

Q. VPC এর মধ্যে router আছে, কিন্তু সেইটা আমরা দেখতে পাই না। কারণ সেইটা পুরাটাই **`abstract`** করা। এই router এর সাথে cloud router এর **`differnece`** কোথায়?
Ans: যদি আমার VPC থেকে আরেকটা cloud এ packet পাঠাতে চাই, তাহলে এই **`hybrid cloud router`** use করতে হব

Google Cloud Router **`enables dynamic route`** updates `between` your **`Compute Engine VPN and your non-Google network`**. Cloud Router eliminates the need to configure static routes and automatically discovers network topology changes.

- Cloud Router একটা **`maneged service`**

#### VM/Server Launch করব

Google Cloud welcome page -> Click `+` button 'Create a VM' -> Select `Name`, `Region`, `Zone` -> Advanced options -> Networking -> Networking interfaces -> Edit network interface -> Select `Network`, `Subnetwork` -> `None` for External IPv4 addresses option -> Create VM

<img width="750" alt="Screenshot 2023-07-29 at 10 09 52 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/408bf5b5-6c48-485d-bb8d-6711510eb9eb">

<img width="750" alt="Screenshot 2023-07-29 at 10 12 27 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e5d5f2f4-c816-47b2-ad8d-2fb05db2d19f">

- Server এ যেখানে application টা চলবে, শুধুমাত্র সেখানে public IP থাকবে সাথে এবং কেবলমাত্র একটা port open করা থাকবে **`(443)`**। HTTPS প্যাকেট ঢুকে ডাটাবেসের সাথে কথা বলবে।


#### VM/Server এ ঢুকার চেষ্টা করব

Click on the **`SSH`**

<img width="750" alt="Screenshot 2023-07-29 at 10 19 45 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/f92e04d6-2a4b-42f9-86ca-0f6ccd923e47">


