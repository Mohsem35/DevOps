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

- Tables consist of chains, which are lists of rules which are followed in order. The default table, **`filter`**, contains three built-in chains: **`INPUT`**, 
**`OUTPUT`**, and **`FORWARD`** which are activated at different points of the packet filtering process.
- The **`nat`** table includes **`PREROUTING`**, **`POSTROUTING`**, and **`OUTPUT`** chains.

   - INPUT packages destined for local sockets.
   - FORWARD packets routed through the system.
   - OUTPUT packets generated locally.

