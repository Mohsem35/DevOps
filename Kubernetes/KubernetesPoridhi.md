
### Class 3

Instructor: Shajal

K8s এর প্রত্যেকটা জায়গা বুঝে deploy করার try করব 

digital-ocean এ একটা cluster deploy করব, ওই custer এর মধ্যে আমরা আমাদের service গুলো deploy করার try করব এবং out of world expose করব    


**`IPVS`**: Linux kernel এর internal load balancer

**`CoreDNS`** DNS resolve করতেছে, আর কোন pod এ packet পাঠাইতে হবে সেইটা করতেছে **`Iptable`**. Service এর IP টাকে বলা হয় **`VIP(virtual ip)`**

L4 হচ্ছে TCP load balancer, L7 হচ্ছে HTTP load balancer

Iptable হচ্ছে port forwarding এর জন্য, আর IPVS হল load balancing এর জন্য

PCI-DSS rules of Bangladesh bank

Managed sercice (AES, GKS) gives you the managed load balancers.

Book: Kubernetes in Action