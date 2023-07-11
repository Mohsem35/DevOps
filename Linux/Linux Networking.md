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



