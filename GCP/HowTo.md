- প্রতিটা region এর জন্য  **`default quota`** থাকে। ধরি, `us-east-1` region তে 5 টার বেশি subnet বানাতে পারব না, তখন 6 no subnet create করতে গেলে, GCP subnet create করতে দিবে না।
- Cloud এ যখন কোন resource/VM বানাই, তখন **`DAG(Directed Asylic Graph)`** তৈরি হয়, মানে dependency grapy। **`আগে child গুলো কে delete করতে হবে`** অর্থাৎ আগে dependency object delete করে তারপর parent কে delete করতে পারব। **`Terraform`** এইভাবে কাজ করে।  
- Suppose, VPC delete করতে চাচ্ছি, তাহলে
```delete VM -> delete subnet -> delete VPC```
- VM/Instance creation এর সময়, **`boot disk`** একটা option দেখতে পাই। যেই disk থেকে VM boot হয়, তাকেই boot disk বলে।

## IAP(Identitiy Access Management) ঠিক করতে হবে 

search `iap` in search box -> `ENABLE API` in IAP -> GO TO IDENTITY-AWARE PROXY -> click on `CONFIGURE CONCENT SCREEN` -> select `external` -> Create -> App information App name `hi` ->  User support email -> Developer contact information -> Save and Continue.



<img width="750" alt="Screenshot 2023-07-31 at 10 46 21 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/c26ca9c5-8336-4c1d-bf2b-c15bc1fb45ba">


<img width="750" alt="Screenshot 2023-07-31 at 10 56 54 AM" src="https://github.com/Mohsem35/DevOps/assets/58659448/6c4500d7-c120-4e2f-8b6a-5ee5df15fa5b">


## Create a Firewall rule for telnet

VPC network -> Firewall -> Create a firewall rule -> Name `b-allow-all` -> Network `b` -> Direction of traffice `Ingress` -> Action on match `Allow` -> Targets `All instances in the network` -> Source IPv4 ranges `0.0.0.0/0` -> Protocols and Ports `Allow All` -> Create

<img width="750" alt="Screenshot 2023-07-31 at 3 13 12 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/5781b5d7-9566-4891-9a82-d143e63d326e">


<img width="750" alt="Screenshot 2023-07-31 at 3 18 53 PM" src="https://github.com/Mohsem35/DevOps/assets/58659448/6f181b39-9b32-4bb2-9168-8338adccc9c9">




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
