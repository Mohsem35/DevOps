## iptables

iptables is a **`command-line firewall utility`** that uses **`policy chains to allow or block traffic`**. When a connection tries to establish itself on your system, 
iptables looks for a rule in its list to match it to. If it doesn’t find one, it resorts to the default action.

iptable তে 3 টা part/level/beghavior থাকে

1. Table
2. Chain
3. Rule

iptables is used to inspect, modify, forward, redirect, and/or drop IP packets. The code for **`filtering IP packets`** is already built into the kernel 
and is organized into a collection of **`tables`**, each with a specific purpose. The tables are made up of a set of predefined **`chains`**, and the chains contain 
**`rules`** which are traversed in order

The term iptables is also commonly used to refer to this kernel-level firewall.



- To list the iptables rules
```
sudo iptables -L --line-numbers
```
##### Parameters
- `t` for table
- `j` for action
- `check` option is used for checking the existence of a rule
-  `A` adding rule

 ### iptable commmands examples

- Adding a rule to the **`INPUT chain`** in the **`filter table`** of iptables, instructing it to **`drop (discard) all incoming packets`**

```
iptables -t filter --append INPUT -j DROP
```
- Checking whether there is a rule in the **`INPUT`** chain of the **`filter`** table that matches packets with a source IP address of **`192.168.1.123`** and **`drops`** them অর্থাৎ 192.168.1.123 IP থেকে কোন packet আসলে drop করে দিবে এইরকম কোন rule, filter টেবিলে দেয়া আছে কিনা check করতেছি  

```
iptables -t filter --check INPUT -s 192.168.1.123 -j DROP
```

- Adding a rule to the **`INPUT chain`** in the **`filter table`** of iptables, instructing it to **`drop (discard)`** all incoming packets of **`UDP`** protocol

```
iptables -t filter -A INPUT -p udp -j DROP
```
- Adding a rule to the **`FORWARD chain`** in the **`filter table`** of iptables, instructing it to **`drop (discard)`** all incoming packets.

```
iptables -t filter -A FORWARD -j DROP
```
- Deleting the rule with **`index 10`** from the **`INPUT chain`** of the **`filter table`** in iptables.

```
sudo iptables -D INPUT 10
```

### Tables
iptables contains five tables:

1. `raw` is used only for configuring packets so that they are exempt from connection tracking.
2. **`filter`** is the default table, and is where all the actions typically associated with a firewall take place. Request হয় allow করবে, নাহয় deny করবে 
4. **`NAT`** is used for network address translation (e.g. port forwarding). Packet এর source/destination modify করা লাগবে কিনা. Suppose আমার public IP তে কোন packet আসছে, এখন এইটা কোন private IP তে নিতে হবে **`decide`** করবে NAT
6. `mangle` is used for specialized packet alterations. Packet এর header modify করতে পারবে 
7. `security` is used for Mandatory Access Control networking rules (e.g. SELinux -- see this article for more details).

In most common use cases, you will only use two of these: filter and nat. The other tables are aimed at complex configurations involving multiple routers 
and routing decisions and are in any case beyond the scope of these introductory remarks.

### Chains

- Tables consist of chains, which are **`lists of rules`** which are followed in order.
- The default table, **`filter`**, contains three built-in chains which are activated at different points of the packet filtering process.
   - **`INPUT`** chain is the rule that controls incoming packets. Here you can block or allow new connections. You can do this based on port, protocol, and source IP address.
   - **`FORWARD`** chain filters incoming packets that are being forwarded to a different end location
   - **`OUTPUT`** packets generated locally. It is important to note that if you ping an external host then the input chain will be used to return the data back to you.
- The **`nat`** table includes four built-ins  chains.
   - **`PREROUTING`** used for altering a packet as soon as it’s received.
   - **`OUTPUT`** used for altering locally-generated packets.
   - **`POSTROUTING`** used for altering packets as they are about to go out.

### Rules

কি ধরেনের কাজ হবে rules অনুযায়ী

Each rule has two components: 
1. **`Matching`** component: Matches are conditions that determine whether a rule should be applied to a packet
2. **`Target`** component: Targets are the final destination for a packet within a chain. They can be built-in targets, such as **`ACCEPT`**, **`DROP`**, or **`REJECT`**


### Underlay and Overlay Network

![www queryhome](https://github.com/Mohsem35/DevOps/assets/58659448/1ad3a852-191c-4931-9761-af795f289b57)

Underlay Network is **`physical infrastructure`** above which overlay network is built. It is the underlying network responsible for delivery of packets across networks. Underlay networks can be Layer 2 or Layer 3 networks. **`Layer 2`** underlay networks today are typically based on Ethernet, with segmentation accomplished via VLANs. The Internet is an example of a Layer 3 underlay network.

An Overlay Network is a **`virtual network`** that is built on top of underlying network infrastructure (Underlay Network). Actually, “Underlay” provides a “service” to the overlay. Overlay networks implement network virtualization concepts. A virtualized network consists of **`overlay nodes`** (e.g., routers), where Layer 2 and Layer 3 tunneling encapsulation (VXLAN, GRE, and IPSec) serves as the transport overlay protocol.


## VXLAN (Virtual Extensible LAN)

VXLAN is a network virtualization technology that allows the creation of **`virtual Layer 2 networks over an underlying Layer 3 infrastructure`**. It was designed to address the scalability limitations of traditional VLANs (Virtual Local Area Networks) in large-scale data center environments.

- It runs over the existing networking infrastructure and provides a means to **`stretch`** a Layer 2 network.
- Each VXLAN segment is identified through a 24-bit segment ID termed the **`VNI`**
- Only VMs within the **`same VXLAN segment`** can communicate with each other.

### VNI (VXLAN Network Identifier)

- Unlike VLAN, VxLAN does not have ID limitation. It uses a **`24-bit header`**, which gives us about 16 million VNI’s to use. 
- A VNI is the **`identifier`** for the LAN segment, similar to a VLAN ID. With an address space this large, an ID can be assigned to a customer, and it can remain unique across the entire network.

### VTEP (VXLAN Tunnel End Point)

VXLAN traffic is **`encapsulated`** before it is sent over the network. This creates stateless **`tunnels`** across the network, from the **`source`** switch to the **`destination switch`**. The encapsulation and decapsulation are handled by a component called a VTEP (VxLAN Tunnel End Point). A VTEP has an **`IP address`** in the underlay network. It also has one or more VNI’s associated with it. When frames from one of these VNI’s arrives at the Ingress VTEP, the VTEP encapsulates it with UDP and IP headers. The encapsulated packet is sent over the IP network to the Egress VTEP. When it arrives, the VTEP removes the IP and UDP headers, and delivers the frame as normal.


## Create a multi-container host networking using VXLAN overlay networks
![vxlan-diagram](https://github.com/Mohsem35/DevOps/assets/58659448/dae8bed2-9aac-4d63-93ba-fd6ccedd09c7)

Let's start...

#### Prerequisite 
For this demo, anyone can deploy two VM on any hypervisor or virtualization technology. Make sure they are on the same network thus hosts can communicate each other.


Host-01 IP: 172.16.6.18

Host-02 IP: 172.16.6.57

#### For Host-01(172.16.6.18):

##### Step 1: Update the repository and install _docker client_
```
sudo apt update
sudo apt install -y docker.io
```
##### Step 2: Create a separate _docker bridge network_

```
sudo docker network create --subnet 172.18.0.0/16 vxlan-net
```
The **`docker network create`** command creates a new Docker network, and the **`--subnet`** option specifies the subnet range for the network. In this case, the subnet range is **`172.18.0.0/16`**, which means it can accommodate IP addresses from 172.18.0.1 to 172.18.255.254. Here, docker network named as **`vxlan-net`**

##### Step 3: List all networks in Docker and find the newly created Docker network _vxlan-net_

```
sudo docker network ls
```
<img width="298" alt="Screenshot 2023-07-13 at 6 31 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/542e5290-0f2b-46af-a9be-bd59f233e2a5">

##### Step 4: Check interfaces for sure

```
ip a
```
<img width="626" alt="Screenshot 2023-07-13 at 6 34 03 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/312f21dc-5c58-465e-8820-2f241087f1e4">

##### Step 5: Running ubuntu container with static IP within _vxlan-net_ network

```
sudo docker run -d --net vxlan-net --ip 172.18.0.11 ubuntu sleep 3000
```

- This command will **`start a new docker container`** with **`docker run`** based on the **`ubuntu`** image
- Assign it the IP address of the container **`172.18.0.11`** **`within`** the **`vxlan-net`** network
- Run the **`sleep 3000`** command inside the container. The container will continue running in the background for 50 minutes (3000 seconds).
- **`-d`** detaches the container and runs it in the background for 3000 seconds.

<img width="540" alt="Screenshot 2023-07-13 at 6 46 24 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ef6e8b72-1ae5-4c7e-a99d-a8bc8715e970">

##### Step 6: Check the container running and IP assigned properly 

```
sudo docker ps
```
<img width="557" alt="Screenshot 2023-07-13 at 6 51 23 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d603b15e-e33f-4d6a-a388-f017105d8cee">


```
# Check the IPAddress to make sure that the ip assigned properly 
sudo docker inspect 9f8fc50faf36 | grep IPAddress
	"SecondaryIPAddresses": null,
	"IPAddress":""
		"IPAddress": "172.18.0.11",
```

<img width="432" alt="Screenshot 2023-07-13 at 7 09 51 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/f7160c5d-9749-4002-adc4-cb288750b759">

##### Step 7: Enter the running container using _exec_

```
sudo docker exec -it 9f8fc50faf36 bash
```

- **`docker exec:`** Executes a command inside a running Docker container.
- **`-it:`** Allocates a pseudo-TTY and allows interactive terminal access


```
# In container, update packages and install net-tools and ping tools
apt-get update
apt-get install net-tools
apt-get install iputils-ping
exit
```

##### Step 8: Check the bridges list on the hosts

```
brctl show
```
<img width="476" alt="Screenshot 2023-07-13 at 7 26 59 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/b7d44d0f-934e-4778-8847-8a22690f06f5">

##### Step 9: Create a _VXLAN_

```
sudo ip link add vxlan-demo type vxlan id 100 remote 172.16.6.57 dstport 4789 dev eth0
```
- **`vxlan-demo:`** is the name of the VXLAN interface.
- **`ip link add:`** Specifies the ip command to add a new network link.
- **`type vxlan:`** Specifies that the type of interface to be created is VXLAN.
- **`id 100:`** Sets the VXLAN Network Identifier (VNI) to 100. This ID is used to differentiate between different VXLAN networks.
- **`10.0.1.41`** is the ip of another host
- **`dstport 4789:`** Sets the destination UDP port for the VXLAN tunnel. The standard port for VXLAN is 4789.

By executing this command, you will **`create a new VXLAN interface`** named vxlan-demo with an ID of 100. The interface will be connected to the specified remote endpoint <second_host_ip> using **`UDP`** port 4789. The VXLAN traffic will be sent and received through the eth0 network device.

##### Step 9: Check interface list if the VXLAN interface created

``` 
ip a | grep vxlan
```

<img width="621" alt="Screenshot 2023-07-13 at 8 01 25 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/0d903b5a-39fb-41bc-865b-d955d5e0b718">

##### Step 10: Make the _VXLAN interface up_

```
sudo ip link set vxlan-demo up
```

##### Step 10: Attach the newly created VXLAN interface to the docker bridge we created

```
brctl show
```
```
sudo brctl addif <bridge_name> vxlan-demo
```
<img width="408" alt="Screenshot 2023-07-13 at 8 08 21 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/3ddb681a-c720-4018-a681-ad60054b4435">

##### Step 11: Check the route to ensure everything is okay. here '172.18.0.0' part is our concern part

```
route -n
```
<img width="533" alt="Screenshot 2023-07-13 at 8 10 56 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ef656344-7281-416d-bf0c-de14bf4d7144">


#### For Host-02(172.16.6.18):

```
sudo apt update
sudo apt install -y docker.io
sudo docker network create --subnet 172.18.0.0/16 vxlan-net
sudo docker network ls
sudo docker run -d --net vxlan-net --ip 172.18.0.12 ubuntu sleep 3000
sudo docker ps
sudo docker inspect <container_id> | grep IPAddress
sudo docker exec -it <container_id> bash
```

```
# inside container
apt-get update
apt-get install net-tools
apt-get install iputils-ping
exit
```

```
sudo ip link add vxlan-demo type vxlan id 100 remote 172.16.6.18 dstport 4789 dev ens18
ip a | grep vxlan
sudo ip link set vxlan-demo up
brctl show
sudo brctl addif <bridge_name> vxlan-demo
route -n
sudo docker exec -it <container_id> bash
```

```
# inside the container
ping 172.18.0.11 -c 2
```
<img width="455" alt="Screenshot 2023-07-13 at 10 36 47 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/341f2a5c-944d-4368-b79b-30eea5a21b0e">



