
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


### Class 6


AWS এর managed k8s service কে বলা হয় EKS , আজকে EKS launch করার try করব

AWS শুধুমাত্র **`Control Plane`** টা manage করবে, বাকিটা নিজেদের manage করতে হবে । AWS whole kubernetes infrastructure টা নিজে ম্যানেজ করবে, আমরা শুধু application টা ম্যানেজ করব  

Control plane ২ রকমের হতে পারে । public & private

- আমরা যখন `kubectl get pods` command টা দেই, তখন সেইটা যাচ্ছে **`API Server`** এর কাছে। আর সেই API Server, etcd এইসব locate করতেছে control plane এর মধ্যে 

- private network এর মধ্যে CICD করতে হলে, private network এর under এ যেকোন vm/server তে **`Gitlab Runner`** install করা থাকতে হবে। code push করে repository তে, আর application deploy করতেছে kubernetes cluster এর ভিতরেই। মানে কাউকেই বাহিরে যেতে হচ্ছে না private cluster এ 

**`Docker in Docker`** 

EKS তে load balancer(**L7-HTTPS**)আছে যেই 3/4 টা node আছে সেগুলোকে **`AutoScaling Group`** এর মধ্যে ফেলে 

**`AutoScaling Group`** এ suppose আমার একটা vm আছে, যদি দরকার পড়ে আমরা সেই group এর মধ্যে 20 টা vm declare করতে পারব

kubernetes টা managed service হিসেবে চালাব 