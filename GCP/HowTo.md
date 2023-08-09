- প্রতিটা region এর জন্য  **`default quota`** থাকে। ধরি, `us-east-1` region তে 5 টার বেশি subnet বানাতে পারব না, তখন 6 no subnet create করতে গেলে, GCP subnet create করতে দিবে না।
- Cloud এ যখন কোন resource/VM বানাই, তখন **`DAG(Directed Asylic Graph)`** তৈরি হয়, মানে dependency grapy। **`আগে child গুলো কে delete করতে হবে`** অর্থাৎ আগে dependency object delete করে তারপর parent কে delete করতে পারব। **`Terraform`** এইভাবে কাজ করে।  
- Suppose, VPC delete করতে চাচ্ছি, তাহলে
```delete VM -> delete subnet -> delete VPC```
- VM/Instance creation এর সময়, **`boot disk`** একটা option দেখতে পাই। যেই disk থেকে VM boot হয়, তাকেই boot disk বলে।

## 'Network tag' এর use cases

#### Step 1: Create a vpc with subnet

- choose individual names for **`vpc`** and **`subnet-name`**

`vpc name(a)`,`subnet-name(a-subnet)`,`region(us-east1)`, `IPv4 range(10.10.0.0/16)`, `IPv4 firewall rules(allow all)` -> create


#### Step 2: Create a vm/instance within a-subnet

`name(a)`,`region(us-east1)`,`firewall(allow both http/https traffic)` -> Advanced options -> networkig -> **`network tags(ingress)`**, `network interface(a-subnet)` -> create

#### Step 3: Install packages in the 'a' vm/instance and telnet form my pc

- `ssh` তে click করে `a vm/instance` তে ঢুকব
```
# check boot disk size
sudo lsblk
sudo apt-get install netcat
sudo netcat -l -p 8080
```
- আমার pc terminal থেকে telnet করব `a` vm কে

```
telnet <a_vm_public_ip> 8080
```
কিছু পাব না, কিন্তু 22 port দিয়ে telent করলে `a` vm কে পাব

```
telnet <a_vm_public_ip> 22
```

<img width="500" alt="Screenshot 2023-08-08 at 11 02 57 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/16d9c87b-5e1c-4b9f-b6b8-9f2cec081a26">


#### Step 4: Firewall rule create করব


Firewall rule 3 ভাবে create করা যায়
1. `tag` এর উপড়ে [best practice]
2. সবার উপড়ে গণ [bad practice]
3. `service account` introduce করে [key দিয়ে]। এই key use করে যারা যারা connection করতে চাইবে, তাদেরকে আমি ঢুকতে দিব। এইটা হচ্ছে **`software layer`** 

- যেহেতু 8080 port দিয়ে `a` vm কে access করা গেল না, তাই আমরা firewall rull বসাব
- আমরা আগে `ingress` নামে যে tag create করছিলাম `a vm` creation এর সময়, এখানে সেটা declare করব firewall rule এ 

cloud firewall -> firewall policies -> create a firewall policy -> `name(a-subnet-firewall)`, `network(a vpc)`, `Targets(specified target tags)`, `Target tags(ingress)`, `source ipv4 ranges(my_isp_ip/32)` [যেহেতু একটা মাত্র ip allow করতে চাচ্ছি] -> Protocols and ports(specified protocols and ports)` -> tick `TCP` -> Ports(8080) -> create

> **_NOTE:_**  firewall rull যখনি overlap করবে অর্থাৎ rule একই হয়ে গেলে, তখন যার priority বেশি হবে সেই `firewall rule follwed` হবে । পুরা system এর সব জায়গায় যদি এরমকম priority বসাই তাহলে সেটা খুব বাজে system হবে


#### What is 'service account' and how does it work?


#### Step 5: Update package and telnet form my pc terminal

- `a vm` তে ঢুকব
```
sudo apt install netcat
sudo netcat -l -p 8080
```
- এখন আমার pc terminal থেকে `telnet` করব
```
telnet <a_vm_public_ip> 8080
```

<img width="450" alt="Screenshot 2023-08-08 at 11 52 24 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/cba2ddf3-72fe-442f-82e2-411a6d6ec465">


![Untitled-2023-08-08-2315](https://github.com/Mohsem35/DevOps/assets/58659448/fd203579-5890-4a72-a011-374be7297a34)
##### it works

#### Step 6: এখন 9090 port allow করতে চাচ্ছি

- যেহেতু `9090 port allow` করতে চাচ্ছি, তাহলে `ingress firewall policy` টা আমাদের update করতে হবে 

cloud firewall -> firewall policies -> `ingress policy` -> Edit -> Protocols and ports(specified protocols and ports)` -> `TCP` -> **Ports(8080, 9090)** -> save

- `a vm` তে ঢুকব
```
sudo netcat -l -p 9090
```

- এখন আমার pc terminal থেকে `telnet` করব 9090 port এ 
```
telnet <a_vm_public_ip> 9090
```

## Local pc থেকে direct এর GCP vm/instance তে ঢুকব

#### Step 1: Create public/private key for maly

maly user এর জন্য `ssh-keygen` তৈরি করব

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f /path/to/custom/directory/
```

```
ssh-keygen -t rsa -b 4096 -C "your_name" -f /path/to/custom/directory/
```

```
# select this one
ssh-keygen -C maly -f /path/to/custom/directory/
cat /path/to/custom/directory/maly.pub
```

#### Step 2: Add public key to the vm/instance

- `maly.pub` key টা cat করে copy করব

computer engine -> click on `a vm` -> edit -> SSH keys -> `+` add item -> paste the `maly.pub` -> save

- চেক করে দেখতে হবে, কোন `username` তে আমরা নতুন key টা `ssh-keys` তে add করলাম
 

[Use another SSH client documentation](https://cloud.google.com/compute/docs/connect/standard-ssh#openssh-client)

```
ssh -i PATH_TO_PRIVATE_KEY USERNAME@EXTERNAL_IP
```

```
ssh -i /path/to/custom/directory/ maly@public_ip_a_vm
```

## Attach disk to a GCP vm/instance 

#### Step 1: Check disk status of 'a vm' 

- আমার pc termianl থেকে gcp `a vm/intance` তে ঢুকব আগে

```
ssh -i /path/to/custom/directory/ maly@public_ip_a_vm
```

- Then run the following command in the `a vm` 

```
sudo lsblk
```

#### Step 2: Create disk space and attach the disk to 'a vm'

search `create a disk` in the search box -> `name(disk-1)`, `locatio(single zone)` [regional দিলে replica তৈরি হবে, একটা fail করলেও অন্যটায় data থাকবে], `region(us-east1)` -> Disk settings -> `size(100)` -> Encryption -> `google-managed encryption key` -> create


এখন `a vm/intance` তে ঢুকব from UI -> edit -> additional disks -> click + button to `attach existing disk` -> `Existing disk` tab pop up -> `Disk(disk-1)`, `Mode(read/write)` -> `save` of `Existing disk` tab -> `save` of `a vm` 





[Add a persistent disk to your VM documentation](https://cloud.google.com/compute/docs/disks/add-persistent-disk)

[Format and mount a non-boot disk on a Linux VM documentation](https://cloud.google.com/compute/docs/disks/format-mount-disk-linux)

## Network Tag

- Network tag টা অনেকটা তারের মধ্যে tag লাগানোর মত
- Network Tag কিন্তু firewall rule না, just placeholder
- VM/Instance এর সাথে আমরা `network tag` attach করি, then `firewall rule` আমরা network tag তে apply করি
- Tagging খুবই important, যেকোন network design, planning সবকিছুই হবে tagging এর basis করে

A tag is simply **`a character string`** added to a _tags_ field in a resource, such as **`Compute Engine`** virtual machine (VM) instances or **`instance templates`**. A tag is not a separate resource, so you cannot create it separately. All resources with that string are considered to have that tag. Tags enable you to make `firewall rules` and `routes` applicable to specific VM instances.

**`IAP`**: Google আমাদের packet টা ওদের সার্ভারে নিয়ে যাচ্ছে, authentication system বসায়ে তারপর আমাদের packet আমাদের সার্ভারে নিয়ে যাচ্ছে more secure way তে


### Firewall rules and routes
Network tags allow you to apply firewall rules and routes to a specific instance or set of instances:
  - You make a firewall rule applicable to specific instances by using target tags and source tags.
  - You make a route applicable to specific instances by using a tag.
