kubernetes container বানাইতেছে না, container গুলো manage করার responsibility হচ্ছে kubernetes এর 

kubernetes lowest point of entity is **`pod`**. pod is a collection of containers. pod এর মধ্যে containers গুলো নিজেদের মধ্যে communicatuion করে নেয়(logically connected)

**`Deployment`** is responsible for handling multiple containers

**`deployment.yml`**

locally use করার জন্য **`minikube`**, k8 এর short version

```
kubectl get pods                             # List all pods in the namespace
```

```
kubectl get deployment                        # List all deployments
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


1:17