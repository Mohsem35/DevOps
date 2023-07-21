![vxlan-demo](https://github.com/Mohsem35/DevOps/assets/58659448/39a7e998-9034-4004-ba44-2843db682910)

#### Prerequisite
For this demo, as I am going to keep everything simple and only focus on _vxlan_ feature, anyone can deploy two VM on any hypervisor or virtualization technology. 
Make sure they are on the **`same network`** thus hosts can communicate each other.

#### What are we going to cover in this hands-on demo?

- We will use two VM for this, will install **`OpenVSwitch`**, **`docker`** on them
- Then we will **`create two bridges`** via OpenVSwitch and configure them
- Then we will **`create docker container`** with none network and will **`connect`** them to the previously created **`bridges`**
- After that the main part of this demo, we will create **`VXLAN Tunneling`** between VM's and make the **`overlay network`**
- We will how we can ping one host to each other
- Last not least will configure iptables for communicating with the **`outer world`**.

#### Open vSwitch

![rsz_1200px-open_vswitch_logosvg](https://github.com/Mohsem35/DevOps/assets/58659448/a3d229c3-8104-4eb2-a661-a5ce2f646253)

OpenvSwitch is an open-source, **`multilayer virtual switch`** designed for software-defined networking **`(SDN)`** and virtualization environments. It provides a flexible and programmable network switch that allows network administrators to create and manage virtual networks. OpenvSwitch is typically used in **`cloud computing platforms`**, data centers, and network virtualization scenarios.

OpenvSwitch provides a flexible and scalable networking solution for virtualized environments, making it easier to **`manage and orchestrate network resources`**. Its open-source nature allows for community contributions, enhancements, and customization based on specific deployment requirements

Let's start...

Host Machine 01 - 172.16.6.18

Host Machine 02 - 172.16.6.57

#### For Host-01 (172.16.6.18) 
#### Step-00 
At first, please make sure host machines can communicate with each other. It can be done by **`ping utility`**. It's important because it means that our **`UNDERLAY`** network is working properly. Then _update packeages_ and install essential packeges **`net-tools`**, **`docker`** and **`openvswitch`** for this demo on both VM.

```
sudo apt update
sudo apt -y install net-tools docker.io openvswitch-switch
```

#### Step-01 

Create two bridges using Open vSwitch **`ovs-vsctl`** utility

```
sudo ovs-vsctl add-br ovs-br0
sudo ovs-vsctl add-br ovs-br1
```
- **`ovs-vsctl`**: This is the command-line tool provided by OpenvSwitch for **`managing virtual switch and its components`**.
- **`add-br`**: This subcommand instructs ovs-vsctl to **`add a new bridge`**
- **`ovs-br0`**: This is the **`name given to the new bridge`** being created.

#### _Step-01.01 Then create the internal port/interfaces to the ovs-bridge_

```
# add port/interfaces to bridges
sudo ovs-vsctl add-port ovs-br0 veth0 -- set interface veth0 type=internal
sudo ovs-vsctl add-port ovs-br1 veth1 -- set interface veth1 type=internal
```

- **`add-port`**: This subcommand instructs ovs-vsctl to **`add new port`** to _ovs-br0_ bridge.
- **`veth0`**: This is the **`name of the internal port`** being added to the bridge.
- **`set interface veth0 type=internal`**: This part of the command sets the properties of the port _veth0_. Here, it specifies that the **`interface type is internal`**, which means it is a virtual interface within the host and can be used for internal communication.


#### _Step-01.02 Check the status of bridges_
```
sudo ovs-vsctl show
```
<img width="309" alt="Screenshot 2023-07-19 at 12 10 20 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ea627b2e-a6d5-4499-a735-d6b9ec47a200">


#### _Step-01.03 Now, set IP to the created port/interfaces of the bridges_

```
sudo ip address add 192.168.1.1/24 dev veth0 
sudo ip address add 192.168.2.1/24 dev veth1 
ip a
```

#### _Step-01.04 Up the bridge port/interfaces and check status_ 

```
sudo ip link set dev veth0 up mtu 1450
sudo ip link set dev veth1 up mtu 1450
ip a
```

- **`ip link`**: **`Manipulate`** network interfaces
- **`set dev veth0 up`**: Set the network interface **`veth0`** up, meaning it will be **`activated`** and ready to use
- **`mtu 1450`**: This part sets the **`Maximum Transmission Unit`** (MTU) of the interface to **`1450 bytes`**. The MTU is the maximum size of a single data packet that can be transmitted over the interface.

![rsz_1screenshot_2023-07-19_at_103345_pm](https://github.com/Mohsem35/DevOps/assets/58659448/af10ac8e-cb8a-42c6-a83a-2b92bbf87c6c)


#### Step-02 

It's time to set docker **`container`** with **`None network`**. Also as container will not get any internet connection for now, we will need some tools to analysis so I have wriiten a **`Dockerfile`** for this. Build the image first then run the container.

#### _Step-02.01 Create a docker image from the Dockerfile_ 

```
mkdir dockerfiles
sudo vim /home/ubuntu/dockerfiles/Dockerfile
```
```
# Dockerfile content
FROM ubuntu

RUN apt update
RUN apt install -y net-tools
RUN apt install -y iproute2
RUN apt install -y iputils-ping

CMD ["sleep", "72000"]
```

```
cd <Dockerfile_directory> 
sudo docker build . -t ubuntu-docker
```

The command you provided is used to build a **`Docker image`** based on the **`Dockerfile`** located in the **`current directory (".")`**. The image will be **`tagged`** with the name "ubuntu-docker".
```
sudo docker image ls
```
<img width="430" alt="Screenshot 2023-07-19 at 11 28 54 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/15a7db57-782e-40cf-bef3-8ada1ae66e1e">

#### _Step-02.02 Create containers from the created ubuntu-docker image; Containers not connected to any network_

```
sudo docker run -d --net=none --name docker1 ubuntu-docker
sudo docker run -d --net=none --name docker2 ubuntu-docker
```
- **`-d`**: This flag stands for **`detached mode`**, which means the container will run in the background
- **`--net=none`**: This flag specifies that the **`container should not be connected to any network`**
- **`--name docker1`**: This flag gives a **`custom name`** to the container
- **`ubuntu-docker`**: This is the **`name of the Docker image`** from which the container will be created.


#### _Step-02.02 Check container status and ip_ 
```
sudo docker ps
sudo docker exec docker1 ip a
sudo docker exec docker2 ip a
```
<img width="598" alt="Screenshot 2023-07-19 at 11 37 35 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/eb4f9dcb-2d41-4206-b856-aabc5e882ddd">

> **_NOTE:_**  See that, docker1 and docker2 didn't get any IP

#### _Step-02.03 add ip address to the container using `ovs-docker` utility_ 

```
sudo ovs-docker add-port ovs-br0 eth0 docker1 --ipaddress=192.168.1.11/24 --gateway=192.168.1.1
sudo docker exec docker1 ip a
```
<img width="669" alt="Screenshot 2023-07-19 at 11 47 18 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/8c9754bf-81cb-4259-b732-d3b85604c32f">

- **`ovs-br0`**: This specifies the name of the OVS bridge to which the physical interface "eth0" will be attached.
- **`eth0`**: This is the name of the physical network interface on the host machine that you want to add to the container.
- **`--ipaddress=192.168.1.11/24`**: This flag sets the IP address and subnet mask of the container's interface to 192.168.1.11 with a subnet mask of 255.255.255.0 (/24).
- **`--gateway=192.168.1.1`**: This flag sets the default gateway for the container's network interface to 192.168.1.1.

```
sudo ovs-docker add-port ovs-br1 eth0 docker2 --ipaddress=192.168.2.11/24 --gateway=192.168.2.1
sudo docker exec docker2 ip a
```
<img width="652" alt="Screenshot 2023-07-19 at 11 55 54 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/18355766-5575-43e1-87cd-f74bbf23e047">


#### _Step-02.04 Ping the gateway to check if container connected to ovs-bridges_
```
sudo docker exec docker1 ping 192.168.1.1
sudo docker exec docker2 ping 192.168.2.1
```
<img width="504" alt="Screenshot 2023-07-19 at 11 59 02 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9f7d188e-f70d-473d-bb98-17f23917f3aa">

#### Step 3 
Now we are going to establish the **`VXLAN TUNNELING between the two VM`**. Most importantly the vxlan ID or VNI and udp port 4789 is important. Also we have to configure the remote IP which is opposite VM IP.

```
# One thing to check; as vxlan communicate using udp port 4789, check the current status
netstat -ntulp
```
#### _Step-03.01 Create the vxlan tunnel using ovs vxlan feature for both bridges to another hosts bridges_

Make sure **`remote IP`** and **`key`** options as they are important

```
sudo ovs-vsctl add-port ovs-br0 vxlan0 -- set interface vxlan0 type=vxlan options:remote_ip=10.0.1.169 options:key=1000
sudo ovs-vsctl add-port ovs-br1 vxlan1 -- set interface vxlan1 type=vxlan options:remote_ip=10.0.1.169 options:key=2000
```
The command is used to add a **`VXLAN port named vxlan0`** to the **`Open vSwitch bridge ovs-br0`** with specific options

- **`ovs-vsctl`**: This is the Open vSwitch command-line utility used to manage Open vSwitch bridges, ports, and other components.
- **`add-port`**: This is the ovs-vsctl subcommand used to add a new port to an Open vSwitch bridge.
- **`ovs-br0`**: This is the name of the bridge to which you want to add the **`vxlan0`** port.
- **`type=vxlan`**: This sets the type of the interface to VXLAN. VXLAN is a tunneling protocol used to extend Layer 2 (Ethernet) traffic over an IP network.
- **`options:remote_ip=10.0.1.169`**: This sets the remote IP address for the VXLAN tunnel
- **`options:key=1000`**: This sets the VXLAN network identifier (VNI) or **`VXLAN Network Identifier (VNI)`**. It's used to segregate VXLAN traffic from different virtual networks

#### _Step-03.02 Check the port again, it should be listening_

```
netstat -ntulp | grep 4789
```
<img width="547" alt="Screenshot 2023-07-21 at 5 55 36 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/8793961a-810d-4b40-a231-3c403b3adc6e">


```
sudo ovs-vsctl show
ip a
```
<img width="498" alt="Screenshot 2023-07-21 at 5 56 43 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/6c86aa3e-e428-47b0-ad12-fa58176bbb44">




#### For Host-02(172.16.6.57)

#### Step - 01
```
sudo apt update
sudo apt -y install net-tools docker.io openvswitch-switch
```
```
# Create two bridge using ovs
sudo ovs-vsctl add-br ovs-br0
sudo ovs-vsctl add-br ovs-br1
```
```
# add port/interfaces to bridges
sudo ovs-vsctl add-port ovs-br0 veth0 -- set interface veth0 type=internal
sudo ovs-vsctl add-port ovs-br1 veth1 -- set interface veth1 type=internal
```
```
# check the status of bridges
sudo ovs-vsctl show
```
```
# set the ip to the created port/interfaces
sudo ip address add 192.168.1.1/24 dev veth0 
sudo ip address add 192.168.2.1/24 dev veth1 
ip a
```
```
# up the interfaces and check status
sudo ip link set dev veth0 up
sudo ip link set dev veth1 up
ip a
```

#### Step - 02

```
mkdir dockerfiles
sudo vim /home/ubuntu/dockerfiles/Dockerfile
```
```
# Dockerfile content
FROM ubuntu

RUN apt update
RUN apt install -y net-tools
RUN apt install -y iproute2
RUN apt install -y iputils-ping

CMD ["sleep", "72000"]
```

```
cd <Dockerfile_directory> 
sudo docker build . -t ubuntu-docker
```

```
# create containers from the created image; Containers not connected to any network
sudo docker run -d --net=none --name docker3 ubuntu-docker
sudo docker run -d --net=none --name docker4 ubuntu-docker
```
```
# check container status and ip 
sudo docker ps
sudo docker exec docker3 ip a
sudo docker exec docker4 ip a
```
```
# add ip address to the container using ovs-docker utility 
sudo ovs-docker add-port ovs-br0 eth0 docker3 --ipaddress=192.168.1.11/24 --gateway=192.168.1.1
sudo docker exec docker3 ip a
```

```
sudo ovs-docker add-port ovs-br1 eth0 docker4 --ipaddress=192.168.2.11/24 --gateway=192.168.2.1
sudo docker exec docker4 ip a
```
```
# ping the gateway to check if container connected to ovs-bridges
sudo docker exec docker3 ping 192.168.1.1
sudo docker exec docker4 ping 192.168.2.1
```

#### Step-03
```
# one thing to check; as vxlan communicate using udp port 4789, check the current status
netstat -ntulp
```
```
# Create the vxlan tunnel using ovs vxlan feature for both bridges to another hosts bridges
# make sure remote IP and key options; they are important
sudo ovs-vsctl add-port ovs-br0 vxlan0 -- set interface vxlan0 type=vxlan options:remote_ip=10.0.1.43 options:key=1000
sudo ovs-vsctl add-port ovs-br1 vxlan1 -- set interface vxlan1 type=vxlan options:remote_ip=10.0.1.43 options:key=2000
```
```
# check the port again; it should be listening
netstat -ntulp | grep 4789
```
```
sudo ovs-vsctl show
ip a
```
### Now test the connectivity and see the magic!

```
# FROM docker1
# will get ping 
sudo docker exec docker1 ping 192.168.1.12
sudo docker exec docker1 ping 192.168.1.11

# will be failed
sudo docker exec docker1 ping 192.168.2.11
sudo docker exec docker1 ping 192.168.2.12

# FROM docker2
# will get ping 
sudo docker exec docker2 ping 192.168.2.11
sudo docker exec docker2 ping 192.168.2.12

# will be failed
sudo docker exec docker2 ping 192.168.1.11
sudo docker exec docker2 ping 192.168.1.12
```
```
# FROM docker3
# will get ping 
sudo docker exec docker3 ping 192.168.1.12
sudo docker exec docker3 ping 192.168.1.11

# will be failed
sudo docker exec docker3 ping 192.168.2.11
sudo docker exec docker3 ping 192.168.2.12

# FROM docker4
# will get ping 
sudo docker exec docker4 ping 192.168.2.11
sudo docker exec docker4 ping 192.168.2.12

# will be failed
sudo docker exec docker4 ping 192.168.1.11
sudo docker exec docker4 ping 192.168.1.12

```

```
sudo ovs-docker del-port ovs-br0 eth0 docker2
```

Remove all unused containers, volumes, networks and images

```
sudo docker system prune -a --volumes
```
