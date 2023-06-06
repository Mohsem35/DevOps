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

### Layer 3 - Network - End to End

- Addressing Scheme - IP addresses
    - 32 bits, 4 octets, 0-255
 - L3 Technologies: Routers, Hosts, (anything with IP) 

#### ARP - Address Resolution Protocol
- Links a L3 address to a L2 address
`L2 + L3`

### Layer 4 - Transport - Service to Service
- Distinguish data streams
- Make sure the right program receives the right data.
- Addressing Scheme - Ports
    - 0-65535 - TCP - favors reliability
    - 0-65535 - UDP - favors efficiency
- Servers listen for requests to pre-defined Ports
- Client select random Port number to use as the source Port for the connection.
    - Response traffic will arrive on this port

### Layer 5,6,7 - Session, Presentation, Application
- Distinction between these layers is somewhat vague
- Other Networking Models combine these into one layer.

<img width="608" alt="Screenshot 2023-06-06 at 10 43 30 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/51fca3ce-ffa9-4e55-833f-e57b29fba181">

#### Sending - Encapsulation

Layer 4: TCP + Data = `Segment`

Layer 3: IP + TCP + Data = `Packet`

Layer 2: L2 + IP + TCP + Data = `Frame`

#### De-Encapsulation - Receiving

<img width="1161" alt="Screenshot 2023-06-06 at 10 50 58 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/e0ed8a20-50f2-43e9-b417-fe9f711050ea">

<img width="1395" alt="Screenshot 2023-06-06 at 11 02 06 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/2ad5c28a-8490-4478-8837-723c0c5f2f29">

> **_NOTE:_**  OSI Model is simply a model, not rigid rules everything adheres to

## Everything Hosts do to speak on the internet 

### Scenario - Host A has some data to send to Host B

Host A knows the IP address of Host B. Host A can create the `L3 header` to attach to the data. 
- Host A doesn't know Host B's MAC address.
    - Host A must use **ARP** to resolve target's MAC address.
    - ARP Request includes sender's MAC address
    - ARP Request is a Broadcast - sent to everyone on the network.
    - ARP Mappings are stored in an `ARP Cache`
    - Host B responds by sending an `ARP Response`
    - Host A populates it's ARP cache with Host B's IP/MAC mapping

- Data is sent to Host B and L2, L3 header is discarded.

<img width="1378" alt="Screenshot 2023-06-06 at 11 30 12 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/51efa96c-6b3b-4a8f-a0ee-236499ccacb6">

<img width="1385" alt="Screenshot 2023-06-06 at 11 33 44 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/ff432027-74e0-4843-932f-cf6ddbe0cc00">




