## iptables

iptables is a **`command-line firewall utility`** that uses **`policy chains to allow or block traffic`**. When a connection tries to establish itself on your system, 
iptables looks for a rule in its list to match it to. If it doesn’t find one, it resorts to the default action.

iptables is used to inspect, modify, forward, redirect, and/or drop IP packets. The code for **`filtering IP packets`** is already built into the kernel 
and is organized into a collection of **`tables`**, each with a specific purpose. The tables are made up of a set of predefined **`chains`**, and the chains contain 
**`rules`** which are traversed in order

The term iptables is also commonly used to refer to this kernel-level firewall.



- To list the iptables rules
```
sudo iptables -L
```

### Tables
iptables contains five tables:

1. `raw` is used only for configuring packets so that they are exempt from connection tracking.
2. **`filter`** is the default table, and is where all the actions typically associated with a firewall take place.
4. **`nat`** is used for network address translation (e.g. port forwarding).
5. `mangle` is used for specialized packet alterations.
6. `security` is used for Mandatory Access Control networking rules (e.g. SELinux -- see this article for more details).

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


## Create a multi-container host networking using VxLAN overlay networks

Let's start...

`Step 0:` For this demo, anyone can deploy two VM on any hypervisor or virtualization technology. Make sure they are on the same network thus hosts can communicate each other.

`Step 1:` Install docker client and create separate subnet using docker network utility

For Host-01:

```
# update the repository and install docker
sudo apt update
sudo apt install -y docker.io
```
```
# Create a separate docker bridge network
sudo docker network create --subnet 172.18.0.0/16 vxlan-net
```
The **`docker network create`** command creates a new Docker network, and the **`--subnet`** option specifies the subnet range for the network. In this case, the subnet range is **`172.18.0.0/16`**, which means it can accommodate IP addresses from 172.18.0.1 to 172.18.255.254. Here, docker network named as **`vxlan-net`**

```
# List all networks in docker
sudo docker network ls
```
<img width="298" alt="Screenshot 2023-07-13 at 6 31 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/542e5290-0f2b-46af-a9be-bd59f233e2a5">



