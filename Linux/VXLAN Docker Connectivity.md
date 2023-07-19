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

#### Step-00 
At first, please make sure host machines can communicate with each other. It can be done by **`ping utility`**. It's important because it means that our **`UNDERLAY`** network is working properly. Then _update packeages_ and install essential packeges **`net-tools`**, **`docker`** and **`openvswitch`** for this demo on both VM.

```
sudo apt update
sudo apt -y install net-tools docker.io openvswitch-switch
```

#### _Step-01 Create two bridges using Open vSwitch ovs-vsctl utility_

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

<img width="743" alt="Screenshot 2023-07-19 at 10 33 45 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/3b9ce56f-7845-4770-a1f0-bdb6fdb25ed5">

