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

Q. How many IP addres you can allocate with this?

2^16 - 2

Minus two, cause one for `network address/gateway` and another for `broadcast address`

#### DHCP Server

DHCP server এর কাজ হল IP allocation করা ভিন্ন ভিন্ন MAC address এর জন্য, Switch এ থাকে DHCP সার্ভার

![1 1KIknnLKXpXptCyVRf6KCQ](https://github.com/Mohsem35/DevOps/assets/58659448/2b58e72c-f1bc-43cf-983a-1f4d18a2c9cd)

We use DHCP (Dynamic Host Configuration Protocol) to `automate the process of assigning IP addresses and configuring network parameters to devices on a network.` DHCP eliminates the need for manual IP address configuration, making it easier and more efficient to manage IP addresses in a network environment.


