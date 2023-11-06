kubernetes container বানাইতেছে না, container গুলো manage করার responsibility হচ্ছে kubernetes এর 

kubernetes lowest point of entity is **`pod`**. pod is a collection of containers. pod এর মধ্যে containers গুলো নিজেদের মধ্যে communicatuion করে নেয়(logically connected)

**`Deployment`** is responsible for handling multiple pods

**`deployment.yml`**

locally use করার জন্য **`minikube`**, k8 এর short version

```
kubectl get pods                             # List all pods in the namespace
```

```
kubectl get deployment                        # List all deployments
```

```
kubectl get node                            # List all nodes
```

```shell
# Describe commands with verbose output
kubectl describe nodes my-node
kubectl describe pods <pod_name>
kubectl describe deploy <deployment_name>
```

```
kubectl exec -it <container_name> bash
kubectl exec --stdin --tty my-pod -- /bin/sh        # Interactive shell access to a running pod (1 container case)
```

একটা server তেই যদি full services with k8 depoly করা হয়, তবে সেই server fall করলে সবকিছু destroy হয়ে যাবে। তাই multiple server থাকতে হবে 

server কেই **`node`** বলা হয় k8 তে 

কতগুলি node মিলে form করে **`cluster`**

nodes গুলোকে manage করার জন্য responsibilty হচ্ছে **`control plane`** 

কোন node কই আছে, কোন node এর ভিতরে কয়টা pod আছে এই information গুলো রাখে control plane. control plane যেই node এ থাকে, তাকে বলে **`master node`** আর বাকিগুলো কে বলে slave node 

৩ টা আলাদা আলাদা সার্ভার হইলে ও, সবাই মিলে একটা objective active করার try করে। যেহেতু তারা একই cluster এর মধ্যে আছে 

Ideal case: 2 টা master node, 3 worker node. At a time master node একটাই active থাকে(control plane যেখানে আছে), active master fall করলে 2nd master active হবে 

pods যেকোন node এই থাকতে পারে, এইটা manage করবে k8


nodes গুলো কিভাবে নিজেদের মধ্যে networking establish করবে, internal network টা কিভাবে হবে সেইটার জন্য different different implementation method আছে। nodes গুলো আলাদা আলাদা but they are logicall one

**`Service`**

**`Cluster IP`**

1:36