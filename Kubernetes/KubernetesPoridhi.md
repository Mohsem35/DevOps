
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



### Class 4

Instructor: Shajal

নিজেরা একটা microservice লিখব যেইটা আরেকটা microservice কে call দিবে 

সেই ২ টা microservice আমরা kubernetes cluster এ deploy করব and দেখব তারা নিজেদের মধ্যে কিভাবে communication করতেছে 

আমার machine এ অনেকগুলো cluster থাকলে check করব 

```shell
kubectx

# switch to a specific cluster
kubectx <cluster_name>
```

Makefile দিয়ে docker hub এ কিভাবে image push করতে হয় দেখানো হইছে এইখানে

### Class 5

আজকে আমরা নিজেরা একটা cluster বানাব 

AWS তে একটা vpc নিব, তার ভিতরে একটা subnet থাকবে, একটা worker node আর আরেকটা master node থাকবে । আমরা directly worker node এ traffic পাঠাব 

**`CrashLoopBackOff`** মানে container বার বার up হচ্ছে এবং up হওয়ার পর পরই আবার crash করতেছে  


[Play with Kubernetes](https://labs.play-with-k8s.com/)