### Facts

- Image/Container create and up করার responsibility k8s এর **নয়**, সেগুলো handle করবে docker or podmand। container গুলো **`manage`** করার responsibility হচ্ছে kubernetes এর 
- একটা node(server) তেই যদি full services with k8 depoly করা হয়, তবে সেই server **fall** করলে সবকিছু destroy হয়ে যাবে। তাই **`multiple server`** থাকতে হবে

#### Pods
Kubernetes এর lowest point of entity is **`pod`**. pod is a collection of containers. pod এর মধ্যে containers গুলো নিজেদের মধ্যে communicatuion করে নেয়(logically connected)

Pods are the smallest deployable units of computing that you can create and manage in Kubernetes.

A Pod (as in a pod of whales or pea pod) is a **group of one or more containers**, with **shared storage and network resources**, and a specification for how to 
run the containers

#### Deployment


A Kubernetes deployment is a **resource object** in Kubernetes that provides **declarative updates to applications**. A deployment allows you to describe an **application’s life cycle**, such as _which images to use for the app_, _the number of pods there should be_, and _the way in which they should be updated_. 

The Kubernetes deployment object lets you:

- Deploy a replica set or pod
- Update pods and replica sets
- Rollback to previous deployment versions
- Scale a deployment
- Pause or continue a deployment



You describe a **desired state** in a Deployment, and the **Deployment Controller** changes the actual state to the desired state at a controlled rate.


- Deployment is responsible for **`handling multiple pods`**

the file is named as **`deployment.yml`**

> _Note_: Locally use করার জন্য **`minikube`**, k8 এর short version

![Untitled-2023-11-03-1044](https://github.com/Mohsem35/DevOps/assets/58659448/5c52fef1-f216-4764-84e6-96435872e99e)

```shell
kubectl get pods                            # List all pods in the namespace
```

```shell
kubectl get deployment                        # List all deployments
```

```shell
kubectl get node                              # List all nodes
```
```shell
kubectl delete pod <pod_name>                # Delete specific pod
```
```shell
kubectl get services                            # List all services
```


```shell
# Describe commands with verbose output
kubectl describe nodes my-node
kubectl describe pods <pod_name>            # description of the specific pod
kubectl describe deploy <deployment_name>
```

```
kubectl exec -it <container_name> bash
kubectl exec --stdin --tty my-pod -- /bin/sh        # Interactive shell access to a running pod (1 container case)
```

 #### Node

 Kubernetes runs your workload by placing containers into Pods to run on Nodes. A node may be a **virtual or physical machine**, depending on the cluster. Each node is managed by the **control plane** and contains the services necessary to run Pods.

- Server কেই **`node`** বলা হয় k8s তে 
- কতগুলি node মিলে form করে **`cluster`**


##### Control Plane

nodes গুলোকে manage করার জন্য responsibilty হচ্ছে **`control plane`** 

- কোন node কই আছে, কোন node এর ভিতরে কয়টা pod আছে এই information গুলো রাখে control plane. 
- **control plane যেই node এ থাকে**, তাকে বলে **`master node`** আর বাকিগুলো কে বলে slave node 

৩ টা আলাদা আলাদা সার্ভার হলে ও, সবাই মিলে একটা **objective achieve** করার try করে। যেহেতু তারা একই cluster এর মধ্যে আছে 

**Ideal case**: 2 master node, 3 worker node. At a time master node একটাই active থাকে(control plane যেখানে আছে), active master fall করলে 2nd master active হবে 

pods যেকোন node এই থাকতে পারে, এইটা manage করবে k8s


#### Networking

nodes গুলো কিভাবে নিজেদের মধ্যে networking establish করবে, internal network টা কিভাবে হবে সেইটার জন্য different different implementation method আছে। nodes গুলো আলাদা আলাদা, but they are **logically one**


Networking is a **central part** of Kubernetes, but it can be challenging to understand exactly how it is expected to work. There are 4 distinct networking problems to address:

1. _Highly-coupled container-to-container communications_: this is solved by Pods and localhost communications.
2. _Pod-to-Pod communications_: this is the primary focus of this document.
3. _Pod-to-Service communications_: this is covered by Services.
4. _External-to-Service communications_: this is also covered by Services.


Kubernetes networking refers to the set of practices, protocols, and technologies used to facilitate communication and connectivity between the various components and workloads within a Kubernetes cluster. 

#### Service

In Kubernetes, a Service is a method for **exposing a network application** that is running as one or more Pods in your cluster.

There are 3 types of service
1. clusterIP
2. nodeIP
3. load-balancer


**`Cluster IP`** হচ্ছে k8s এর একটি entity, not a container. **একটি service**. k8s networking এর জন্য clusterIP use করে থাকে 

- প্রতিটা service এর IP থাকে 

যে কোন pod এর 8000 number port তে তুমি আমাকে connect করে দিবে **`clusterIP`**, which is a service. Sort of a load balancer  

> _Note:_ port হবে container এর 

বাহিরে থেকে আমি **direct container** কে port দিয়ে access করতে পারব **না**, আমাকে clusterIP এর through তেই যেতে হবে। container এর কোন particular port এর জন্য clusterIP এর কোন port টা forward করতে হবে বলে দিতে হয় 


#### Ingress

Ingress একটা service 

Ingress হল **load-balancer**, যেইটা full cluster সামনে একটা port open করে। যেই port দিয়ে **internal cluster access** করা যাবে। **ingress controller** দিয়ে **ingress rules** set up করব for routing purpose এর জন্য 

- If ingress fails, then  k8s will manage iteself. ingress is not a container, it's an **entity**


Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. Traffic routing is controlled by rules defined on the Ingress resource.

An Ingress may be configured to give Services externally-reachable URLs, load balance traffic, terminate SSL / TLS, and offer name-based virtual hosting. An **Ingress controller** is responsible for fulfilling the Ingress, usually with a load balancer, though it may also configure your edge router or additional frontends to help handle the traffic

```
kubectl get ingress                            # List all ingress
```

#### Deployments


```
kubectl apply -f .              # build all files in a directory
```
