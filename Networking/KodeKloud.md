### Basic Networking Commands

- **List of interfaces** on the Host machine
```
ip link
```
- Display the **kernel's routing table**
```
route
```

- IP addresses assigned to those interfaces of the Host machine
```
ip addr
```
- **Set IP addresses on the interfaces** on the same network
```
ip addr add <ip_address> dev <interface_name>
```
```
ip addr add 192.168.1.10/24 dev eth0
```

### Routing


- **Send packet** form systemB(one network) to reach systemC(another network) **via Gateway**
```
$ ip route add <systemC_switch_ip> via <switchB_gateway_ip>
```
```
$ ip route add 192.168.2.0/24 via 192.168.1.1
```

![rsz_screenshot_from_2023-06-23_10-24-22](https://github.com/Mohsem35/DevOps/assets/58659448/f5aee566-01ef-48dc-95d8-6ae1d0ad6494)

Send packet from systemC to systemB
```
$ ip route add <systemB_switch_ip via <switchC_gateway_ip>
```

```
$ ip route add 192.168.1.0/24 via 192.168.2.1
```

- Connect the **Router to internet** from C network
```
$ ip route add <internet_ip> via <switchC_gateway_ip>
```
```
$ ip route add 172.217.194.0/24 via 192.168.2.1
```

![rsz_1screenshot_from_2023-06-23_11-04-04](https://github.com/Mohsem35/DevOps/assets/58659448/e1b6618f-3fcc-47e8-b816-59d8c48273d4)


### Default Gateway

- **Give access to the internet** from networkC 
```
ip route add default via <networkC_gateway_ip>
```

```
ip route add default via 192.168.2.1
```

![rsz_1screenshot_from_2023-06-23_11-05-53](https://github.com/Mohsem35/DevOps/assets/58659448/5370099b-34ba-4693-bf54-7bbe32225f99)


### Access Network C from Network A

- Add Routing table entry in Host A
```
ip route add 192.168.2.0/24 via 192.168.1.6
```
- Host B is acting as a Router here
![rsz_screenshot_from_2023-06-23_11-15-11](https://github.com/Mohsem35/DevOps/assets/58659448/f3d56854-81e5-4ca7-a58e-ec6b11c6fd36)

- Add a similar Routing table entry in Host C
```
ip route add 192.168.1.0/24 via 192.168.2.6
```
- By default in Linux, packets are not forwarded from one interface to another
- Set Linux host as a router

for Packet Forward:
```
cat /proc/sys/net/ipv4/ip_forward                #set this value to 1, if it is 0 then packet will not forward
echo 1 > /proc/sys/net/ipv4/ip_forward
```
Keep the changes persistent:
```
sudo vim /etc/sysctl.conf
net.ipv4.ip_forward = 1
```


### Name Resolution - Trnaslating Hostname to IP address
```
sudo vim /etc/hosts
```
```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.4.5 db
192.168.4.6 www.name.com
```
```
ping db

