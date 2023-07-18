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

