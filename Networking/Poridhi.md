#### Interface

In Linux networking, an interface refers to a network interface that connects a device, such as a computer or a server, to a network. 
It can be a `physical interface`, such as an Ethernet port, or a `virtual interface`, such as a loopback interface or a virtual LAN (VLAN) interface.

`Each network interface in Linux is represented by a device file in the **/dev** directory.`
The most common naming convention for Ethernet interfaces is **ethX**, where X is a number representing the interface, such as **eth0**, **eth1**, and so on. Other types of interfaces may have different naming conventions, such as **lo** for the loopback interface or **vlanX** for VLAN interfaces.

![Screenshot from 2023-06-07 14-43-39](https://github.com/Mohsem35/DevOps/assets/58659448/1295089c-066e-4665-8165-46cc3dd2cda8)

#### Linux Namespcae

In Linux, a namespace is a feature that allows the isolation and virtualization of system resources. It provides a way to `partition the operating system resources` such as process IDs, network interfaces, file systems, and more, into separate instances. Each namespace operates independently and has its own set of resources that are isolated from other namespaces.

Linux namespaces are primarily used for process isolation and resource management in containerization technologies like Docker and LXC (Linux Containers). They enable the creation of lightweight, isolated environments called containers, where applications can run without interfering with each other or the host system.

Here are some commonly used namespaces in Linux:

- **PID Namespace:** It provides process isolation, each namespace has its own set of process IDs.
- **Network Namespace:** It isolates network resources such as network interfaces, routing tables, and firewall rules.
- Mount Namespace: It isolates the file system mount points, allowing each namespace to have its own file system layout.
- UTS Namespace: It isolates the hostname and the domain name.
- IPC Namespace: It isolates interprocess communication resources like System V IPC objects (shared memory segments, semaphores, and message queues).
- **User Namespace:** It provides user and group ID mapping, allowing different mappings between the host and the namespace.

#### CIDR - Classless Inter Domain Routing

CIDR is a method used to `allocate and manage IP addresses more efficiently in computer networks`. CIDR replaces the older class-based addressing scheme, which divided IP addresses into fixed network classes (Class A, Class B, and Class C).

CIDR introduced a flexible and hierarchical addressing system that allows for variable-length subnet masking. It represents IP addresses using a combination of the IP address itself and a suffix that specifies the number of significant bits in the network mask. The suffix is written in the form of "/X", where X is the number of bits in the network mask.

`192.168.0.0/24`

In this example, the IP address is 192.168.0.0, and the suffix "/24" indicates that the first 24 bits of the IP address represent the network portion, while the remaining bits represent the host portion.

CIDR notation allows for more efficient allocation of IP addresses and more flexible network design. It `enables network administrators to divide IP address space into smaller subnets of different sizes`, based on the needs of their networks. This helps reduce IP address exhaustion and allows for better utilization of available address blocks.

> **_NOTE:_**  Network Address যত বড়, Clan তত ছোট 

Q. How many IP addresses you can allocate with this?

2^16 - 2

Minus two, cause one for `network address/gateway` and another for `broadcast address`

#### DHCP Server

DHCP server এর কাজ হল IP allocation করা ভিন্ন ভিন্ন MAC address এর জন্য, Switch এ থাকে DHCP সার্ভার

![1 1KIknnLKXpXptCyVRf6KCQ](https://github.com/Mohsem35/DevOps/assets/58659448/2b58e72c-f1bc-43cf-983a-1f4d18a2c9cd)

We use DHCP (Dynamic Host Configuration Protocol) to `automate the process of assigning IP addresses and configuring network parameters to devices on a network.` DHCP eliminates the need for manual IP address configuration, making it easier and more efficient to manage IP addresses in a network environment.

#### Network Namespace
In a Linux system, network namespaces provide `segregated instances of the network stack, interfaces, and routing tables and firewall rules.` Processes can function within their own independent network environment with network namespaces, ensuring isolation from processes in other namespaces.

Using network namespaces, administrators can create isolated network environments for various programs or users, preventing interference or conflicts between them. It also facilitates the deployment of network virtualization and containerization technologies, where each container or virtual machine can operate in its own network namespace, assuring network isolation and security.

## Creating Two network namespaces and connect them with their virtual ethernet


![1 AcZ5xYvn5OfJK1D-9lpZ5A](https://github.com/Mohsem35/DevOps/assets/58659448/441977d0-cd65-4b0a-aebd-f29d10ae49ee)

Linux -> Namespace -> Network namespace

##### 1. Create a virtual machine on PC by using KVM

I have provisioned Ubuntu 20.04 LTS in my virtual machine.
```
cat /etc/os-release
sudo apt install net-tools
```
##### 2. Create two namespaces
```
sudo ip netns add <namespace_name>
```
```
sudo ip netns add red
sudo ip netns add green
ip netns list
```

Red namespace ঢুকতে চাই from Root namespace

```
sudo ip netns exec <namespace_name> /bin/bash
``` 
প্রতিটি namespace এর route table দেখতে চাই
```
route
```
Namespace থেকে বের হতে চাইলে 
```
exit
```

##### 3. Set Virtual Ethernet Port for both namespaces

This will create two virtual interfaces, one for each namespace. Run the following command:
```
sudo ip link add <cable_interface_name> type veth peer name <anothercable_interface_name>  
```
```
sudo ip link add reth type veth peer name geth  
```

Computer এর সাথে connect করাইতে চাই

```
sudo ip link set <cable_interface_name> netns <namespace_name>
```
```
# Red namespace
sudo ip link set reth netns red

# Green namespcae
sudo ip link set geth netns green
```
> **_NOTE:_** Automatically MAC address assigned হয়ে গেছে

##### 4. Set IP Addresses for both namespaces

You can set IP address following 2 approaches.

```
sudo ip netns exec <namespace_name> /bin/bash
sudo ip add <ip_address> dev <cable_interface_name>
exit

```
```
# Red namespace
sudo ip netns exec red /bin/bash
sudo ip add 10.20.100.3/29 dev reth
exit

# Green namespace
sudo ip netns exec green /bin/bash
sudo ip add 10.20.100.3/29 dev geth
exit
``` 

Another approach(without exec mode):

```
sudo ip -n red addr add 10.20.100.3/29 dev reth
sudo ip -n green addr add 10.20.100.4/29 dev geth
```

> **_NOTE:_** IP address ইচ্ছামত assigned করা যাবে, কিন্তু same network এর under এ থাকতে হবে ।
> Cable এর মাথা NIC card ই হচ্ছে interface.

##### 5. Enable / Lights up the virtual ethernet on both namespaces

```
sudo ip netns exec <namespace_name> /bin/bash
ip link set <cable_interface_name> up
```
```
# Red namespace
sudo ip netns exec red /bin/bash
ip link set reth up
exit

# Green namespace
sudo ip netns exec green /bin/bash
ip link set geth up
exit
```

Another approach:
```
sudo ip -n red link set dev reth up
sudo ip -n green link set dev geth up
```

##### 6. Check the IP reachibility.

Ping green namespace from red namespace

```
sudo ip netns exec red /bin/bash
ip add
ping 10.20.100.4 -c3
```
<img width="624" alt="Screenshot 2023-06-20 at 1 03 38 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e7e1ff00-f525-4df1-8598-8e58844f9717">


I have provisioned Almalinux-8 as a virtual machine.


<img width="757" alt="Screenshot 2023-06-16 at 6 46 27 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/7a3d1334-4f2a-41c6-a3ad-0128de5b0041">

<img width="1087" alt="Screenshot 2023-06-16 at 7 11 20 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/031bf7e1-d4dc-483f-8ba6-0c10a669d19d">

<img width="1300" alt="Screenshot 2023-06-16 at 8 40 48 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/2d90e1a2-f678-4ee0-a8f0-36936715eb60">

<img width="1150" alt="Screenshot 2023-06-16 at 9 30 07 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/a5973295-4c6b-4004-a2d4-d06e508e6495">

<img width="1290" alt="Screenshot 2023-06-16 at 9 57 05 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/cdf26b47-ca36-4969-817d-a164919836a9">



