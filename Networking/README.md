## How data flows through the internet
## Network Devices

### Hosts
Hosts are any device which sends or receive traffic over a network.

Ex - computer, laptop, phones, printers, servers, cloud server, IoT devices

Hosts typicall fall in 2 categories.
1. Clients: Client initiate requests, Servers respond
    - Relative to specific communication
2. Servers: Servers are simply computers with software installed which responds to specific requests.

### IP Address
IP Address is the identity of each host.
- IP addresses are 32 bits, represented as four octets.
- Each octet can be 0-255


### Network
A network is what transports traffic between hosts.
- Logical grouping of hosts which require similar connectivity
- Networks can contain other networks
    - Sometimes called **Sub-Networks** or **subnets**


### Repeater
Data crossing a wire decays as it travels.

<img width="858" alt="Screenshot 2023-06-05 at 11 21 02 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/9c4e21cd-7096-4fe1-ba2d-4b79d893e212">


### Hub
Hubs are simply multi-port **Repeaters**

<img width="879" alt="Screenshot 2023-06-05 at 11 23 36 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d88ec4a5-be63-461b-b86e-44111676ae6c">

### Bridge
Bridges sit between Hub-connected hosts.

<img width="869" alt="Screenshot 2023-06-05 at 11 34 57 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/d024a0a2-d80c-4e4a-9f5a-5f46dc7b2da4">


### Switch
Switches faciliate communocation **within** a network.
- Switches are **combinaton of Hubs and Bridges**
- Multiple ports
- Learns which hosts are on each port

**Network:**  Grouping of hosts, which require similar connectivity.
- Hosts on a Network share the same IP address space.

<img width="852" alt="Screenshot 2023-06-05 at 11 43 47 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e8689b90-cd03-4588-be59-b4b3682ee30e">


### Router
Routers faciliate communocation **between** networks.
- Provides a traffic control point(security, filtering, redirecting)
- Routers learn which networks they are attached to known as **Routes** - stored in a **Routing Table**
- Routers create the Hierarchy in Networks and the entire internet.

**Routing Table:** all networks a Router knows about.
> **_NOTE:_**  Traditionally, switches could not perform such filtering.

- Routers have IP addresses in the Networks thay are attached to.

**Gateway:** Each host's way out of their local Network

<img width="1062" alt="Screenshot 2023-06-05 at 11 57 04 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/25651da2-8f1f-42bc-9cc8-eaf94e4305cc">


### Other Network Devices
- Access Points
- Firewalls
- Load Balancers
- Layer 3 Switches
- IDS/IPS
- Proxies
- Virtial Routers

All of them perform Routing And/Or Switching.

## OSI Model - Practical Prespective

Hosts must follow a set of rules. The rules for networking are divided into seven layers. Each layer servers a specific function.

![The-Physical-Layer-in-OSI-Model-Explained-thumbnail](https://github.com/Mohsem35/DevOps/assets/58659448/ab0dc990-ca8d-4206-8051-4bee3c1e4f24)

### Layer 1 - Physical - Transporting Bits

- Computer data exists in form of Bits(0 & 1)
- Something has to transport those bits between hosts
- L1 Technologies: Cables, Wifi, Repeaters, Hub

### Layer 2 - Data Link - Hop to Hop

- Interacts with the Wire (i.e., Physical layer)
    - NIC - Network Interface Cards / Wifi Access Cards
- Addressing Scheme - MAC addresses
    - 48 bits, 12 hex digits
    - Every NIC has a unique MAC address
- L2 Technologies: Switches, NICs
- Often communication between hosts require multiple hops.
