Chapters

1. [What is Kubernetes?](#what-is-kubernetes)



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


#### K8s Components Explanation

**`Node & Pod`**

Pods are the **smallest deployable units** of computing that you can create and manage in Kubernetes.

A Pod (as in a pod of whales or pea pod) is a **group of one or more containers**, with **shared storage and network resources**, and a **specification** for how to run the containers. A Pod's contents are always co-located and co-scheduled, and run in a shared context. 

- Smallest unit of K8s
- **Abstraction over container**
- Usually 1 application per Pod
- **Each Pod gets its own IP address**
- If any Pod dies, new IP address on re-creation

> _Note:_ You only interact with the Kubernetes layer

 

**`Service`**

In Kubernetes, a Service is a **method** for **exposing a network application** that is running as one or more Pods in your cluster.

A key aim of Services in Kubernetes is that you **don't** need to modify your existing application to use an unfamiliar service discovery mechanism. You can run code in Pods, whether this is a code designed for a cloud-native world, or an older app you've containerized. You use a Service to **make** that set of **Pods available on the network** so that **clients can interact** with it.


- **Permanent IP address**
- **Lifecycle of Pod and Service NOT connected**, so even if the Pod dies the service and it's IP address will stay. So you don't have to change that endpoint anymore

> _Note:_ External services are services that opens the communication from external sources(browser) but you wouldn't want your database to be open to the public requests. For that আমি internal service use করব।  
 
**`Ingress`**
 
Instead of service, the **request** from browser **goes first to Ingress** and it does the **forwarding** then to the service 

Ingress exposes HTTP and HTTPS **routes from outside** the cluster to services **within the cluster**. Traffic **routing** is controlled by **rules** defined on the Ingress resource.

An Ingress may be configured to give Services **externally-reachable URLs**, **load balance traffic**, **terminate SSL / TLS**, and offer name-based virtual hosting. An Ingress controller is responsible for fulfilling the Ingress.


**`ConfigMap`** 

and Secret

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

A ConfigMap allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable.

- External configuration of your application
```
DB_URL = mongo-db
```
- 

Database URL usually in the built application

Secret 

- Used to store secret data
- base64 encoded

> _Note:_ The built-in security mechanism is not enabled by default!