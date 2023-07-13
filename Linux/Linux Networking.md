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

#### Prerequisite 
For this demo, anyone can deploy two VM on any hypervisor or virtualization technology. Make sure they are on the same network thus hosts can communicate each other.

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


```
# Check interfaces
ip a
```
<img width="626" alt="Screenshot 2023-07-13 at 6 34 03 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/312f21dc-5c58-465e-8820-2f241087f1e4">

```
# running ubuntu container with "sleep 3000" and a static ip
sudo docker run -d --net vxlan-net --ip 172.18.0.11 ubuntu sleep 3000
```

- This command will **`start a new docker container`** with **`docker run`** based on the **`ubuntu`** image
- Assign it the IP address of the container **`172.18.0.11`** **`within`** the **`vxlan-net`** network
- Run the **`sleep 3000`** command inside the container. The container will continue running in the background for 50 minutes (3000 seconds).
- **`-d`** detaches the container and runs it in the background for 3000 seconds.

<img width="540" alt="Screenshot 2023-07-13 at 6 46 24 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ef6e8b72-1ae5-4c7e-a99d-a8bc8715e970">

```
# Check the container running or not
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

```
# Ping the docker bridge ip to see whether the traffic can pass 
ping 172.18.0.1 -c 2
```

```
# Enter the running container using exec
sudo docker exec -it 9f8fc50faf36 bash
```
- **`docker exec:`** Executes a command inside a running Docker container.
- **`-it:`** Allocates a pseudo-TTY and allows interactive terminal access


```
# Now we are inside running container
# update the package and install net-tools and ping tools 
apt-get update
apt-get install net-tools
apt-get install iputils-ping
exit
```

```
# Check the bridges list on the hosts
brctl show
```
<img width="476" alt="Screenshot 2023-07-13 at 7 26 59 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/b7d44d0f-934e-4778-8847-8a22690f06f5">

```
# Create a vxlan
sudo ip link add vxlan-demo type vxlan id 100 remote <second_host_ip> dstport 4789 dev eth0
```
- **`vxlan-demo:`** is the name of the VXLAN interface.
- **`ip link add:`** Specifies the ip command to add a new network link.
- **`type vxlan:`** Specifies that the type of interface to be created is VXLAN.
- **`id 100:`** Sets the VXLAN Network Identifier (VNI) to 100. This ID is used to differentiate between different VXLAN networks.
- **`10.0.1.41`** is the ip of another host
- **`dstport 4789:`** Sets the destination UDP port for the VXLAN tunnel. The standard port for VXLAN is 4789.

By executing this command, you will **`create a new VXLAN interface`** named vxlan-demo with an ID of 100. The interface will be connected to the specified remote endpoint <second_host_ip> using **`UDP`** port 4789. The VXLAN traffic will be sent and received through the eth0 network device.

```
# Check interface list if the vxlan interface created
ip a | grep vxlan
```

<img width="621" alt="Screenshot 2023-07-13 at 8 01 25 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/0d903b5a-39fb-41bc-865b-d955d5e0b718">

```
# Make the interface up
sudo ip link set vxlan-demo up
```

```
brctl show
```
```
# now attach the newly created vxlan interface to the docker bridge we created
sudo brctl addif <bridge_name> vxlan-demo
```
<img width="408" alt="Screenshot 2023-07-13 at 8 08 21 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/3ddb681a-c720-4018-a681-ad60054b4435">

```
# check the route to ensure everything is okay. here '172.18.0.0' part is our concern part. check_the_route
route -n
```
<img width="533" alt="Screenshot 2023-07-13 at 8 10 56 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ef656344-7281-416d-bf0c-de14bf4d7144">

```
# Enter the running container using exec
sudo docker exec -it 9f8fc50faf36 bash
```

```
# won't work as 2nd host is not ready yet
ping 172.18.0.12 -c 2
```

For Host-02(172.16.6.57)

```
sudo apt update
sudo apt install -y docker.io
sudo docker network create --subnet 172.18.0.0/16 vxlan-net
sudo docker network ls
sudo docker run -d --net vxlan-net --ip 172.18.0.12 ubuntu sleep 3000
sudo docker ps
sudo docker inspect 6a6064ffc2af | grep IPAddress
sudo docker exec -it 6a6064ffc2af bash
```
```
# inside container
apt-get update
apt-get install net-tools
apt-get install iputils-ping
exit
```

```
brctl show
sudo ip link add vxlan-demo type vxlan id 100 remote 172.16.6.18 dstport 4789 dev ens18
ip a | grep vxlan
sudo ip link set vxlan-demo up
btctl show
sudo brctl addif <bridge_name> vxlan-demo
route -n
sudo docker exec -it 6a6064ffc2af bash
```
```
ping 172.18.0.12 -c 2

```

197389dc97fee266760481c12adcb9eb083dd5985fd19fbc42d1b6dec4fef42d

container ID -  6a6064ffc2af
```
```
<img width="455" alt="Screenshot 2023-07-13 at 10 36 47 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/341f2a5c-944d-4368-b79b-30eea5a21b0e">

