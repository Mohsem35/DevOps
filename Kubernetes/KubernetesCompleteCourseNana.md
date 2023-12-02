Chapters

1. [What is Kubernetes?](#what-is-kubernetes)
2. [K8s Components](#k8s-components)



A **`Kubernetes (K8s) cluster`** is a **grouping of nodes** that **run containerized apps** in an efficient, automated, distributed, and scalable manner. K8s clusters allow engineers to orchestrate and monitor containers across multiple physical, virtual, and cloud servers


#### What is Kubernetes? 

1. open source container orchestration tool
2. developed by google
3. helps you **manage containerized applications** in different **deployment environments** like physical machine, virtual or cloud even hybrid 

What problems does Kubernetes solve?

What are the tasks of an orchestration tool?

The need for a container orchestration tool 
- Trend from **Monolith** to **Microservices**
- Increased usage of **containers**
- Demand for a **proper way** of **managing** those hundreds of containers

What features do orchestration tools offer?

- **High availability** or no downtime
- **Scalability** or high performance
- **Disaster recovery** - backup and restore



#### K8s Components

**`Node & Pod`**

![image](https://github.com/Mohsem35/DevOps/assets/58659448/90bf46e3-e4b0-434b-8242-c4558b49b1ab)
![image](https://github.com/Mohsem35/DevOps/assets/58659448/ad18dd32-199a-469e-bad5-f4615840799e)


Pods are the **smallest deployable units** of computing that you can create and manage in Kubernetes.

A Pod (as in a pod of whales or pea pod) is a **group of one or more containers**, with **shared storage and network resources**, and a **specification** for how to run the containers. A Pod's contents are always co-located and co-scheduled, and run in a shared context. 

- Smallest unit of K8s
- **Abstraction over container**
- Usually 1 application per Pod
- **Each Pod gets its own IP address**
- If any Pod dies, a new IP address on re-creation

<img width="350" alt="Screenshot 2023-12-02 at 7 51 49 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/734d24d5-3b90-4378-b0f3-efaaca9a24aa">


> _Note:_ You only interact with the Kubernetes layer

 

**`Service`**

<img width="550" alt="Screenshot 2023-12-02 at 8 00 03 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/f8843ac1-7383-44ab-a529-e5775ca55b4b">


In Kubernetes, a Service is a **method** for **exposing a network application** that is running as one or more Pods in your cluster.

A key aim of Services in Kubernetes is that you **don't** need to modify your existing application to use an unfamiliar service discovery mechanism. You can run code in Pods, whether this is a code designed for a cloud-native world, or an older app you've containerized. You use a Service to **make** that set of **Pods available on the network** so that **clients can interact** with it.


- **Permanent IP address**
- **Lifecycle of Pod and Service NOT connected**, so even if the Pod dies the service and it's IP address will stay. So you don't have to change that endpoint anymore
- Service is also a **load-balancer**

`Service` request catch করে, forward করে যেই node টা least busy আছে 

> _Note:_ External services are services that opens the communication from external sources(browser) but you wouldn't want your database to be open to the public requests. For that আমি internal service use করব।

![ingress](https://github.com/Mohsem35/DevOps/assets/58659448/2bfc8f66-eec4-4e7c-8271-14b1107e7a7b)
 
**`Ingress`**
 
Instead of service, the **request** from browser **goes first to Ingress** and it does the **forwarding** then to the service 

Ingress exposes HTTP and HTTPS **routes from outside** the cluster to services **within the cluster**. Traffic **routing** is controlled by **rules** defined on the Ingress resource.

An Ingress may be configured to give Services **externally-reachable URLs**, **load balance traffic**, **terminate SSL / TLS**, and offer name-based virtual hosting. An Ingress controller is responsible for fulfilling the Ingress.


**`ConfigMaps`** 

A ConfigMap is an API object used to **store non-confidential data** in **key-value** pairs. Pods can consume ConfigMaps as _environment variables_, _command-line arguments_, or as _configuration files in a volume_.

A ConfigMap allows you to **decouple environment-specific configuration** from your container images, so that your applications are easily portable.

<img width="400" alt="Screenshot 2023-12-02 at 8 24 36 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/6c0c4c9f-33aa-43cf-b8d5-a0cfdc43b82f">



**`Secrets`**

![image](https://github.com/Mohsem35/DevOps/assets/58659448/78e7b654-c5a8-4b63-9658-54ea2800b7a6)

A Secret is an object that contains a **small amount of sensitive data** such as a **password**, a **token**, or a **key**. Such information might otherwise be put in a Pod specification or in a container image. Using a Secret means that you don't need to include confidential data in your application code.

Secrets are **similar to ConfigMaps** but are specifically intended to hold confidential data.

- Used to store secret data
- **base64 encoded**

<img width="400" alt="Screenshot 2023-12-02 at 8 26 53 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/fab6fdb8-ef95-4f1b-976d-71d2c92e37e5">


> _Note:_ The built-in security mechanism is not enabled in K8s by default!

**`Volumes`**

![image](https://github.com/Mohsem35/DevOps/assets/58659448/d0492bb0-a641-43ab-b899-0e7f787d6008)


A Kubernetes volume is a **directory containing data**, which can be accessed by containers in a Kubernetes pod. The location of the directory, the storage media that supports it, and its contents, depend on the specific type of volume being used

_Storage on local machine, remote, outside of the K8s cluster_

> K8s doesn't manage data persistance!

**`Deployment`** 

![image](https://github.com/Mohsem35/DevOps/assets/58659448/16100a2a-9927-4171-8e75-f3c0ff9f8560)


A Deployment provides **declarative updates** for **Pods and ReplicaSets**.

You describe a desired state in a Deployment, and the **Deployment Controller** changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments

**Replicating** everything on **multiple servers/nodes**

**Define blueprints** how many replicas do you want to use for Pods. এই blueprint টাকেই বলা হয় Deployment

- Blueprint for _my-app_ Pods
- You can create Deployments
- **Abstraction of Pods**

> `Deployment` for STATELESS apps

<img width="450" alt="Screenshot 2023-12-02 at 11 46 29 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/a7f901db-54d0-4edb-896b-8b40b85155fc">


**`StatefulSets`**

![image](https://github.com/Mohsem35/DevOps/assets/58659448/5f4cd083-5a62-4335-9d77-db2c180c9ae2)


StatefulSet is the workload API object used to **manage stateful applications**.

Manages the deployment and scaling of a set of Pods, and **provides guarantees** about the **ordering and uniqueness of these Pods**.

Like a Deployment, a StatefulSet manages Pods that are based on an **identical container spec**. Unlike a Deployment, a StatefulSet maintains a sticky identity for each of its Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.

<img width="450" alt="Screenshot 2023-12-02 at 11 50 01 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/05812e77-2bb6-4251-b11f-c212ba0a1ae2">


Database এর data তে যাতে কোন data inconsistness না হয়, তার জন্য `StatefulSets` use করতে হবে 
- For **STATEFUL** apps

but deploying `StatefulSet` for the database is not easy

> `StatefulSets` for STATEFUL apps or Databases
