- প্রতিটা region এর জন্য  **`default quota`** থাকে। ধরি, `us-east-1` region তে 5 টার বেশি subnet বানাতে পারব না, তখন 6 no subnet create করতে গেলে, GCP subnet create করতে দিবে না।
- Cloud এ যখন কোন resource/VM বানাই, তখন **`DAG(Directed Asylic Graph)`** তৈরি হয়, মানে dependency grapy। **`আগে child গুলো কে delete করতে হবে`** অর্থাৎ আগে dependency object delete করে তারপর parent কে delete করতে পারব। **`Terraform`** এইভাবে কাজ করে।  
- Suppose, VPC delete করতে চাচ্ছি, তাহলে
```delete VM -> delete subnet -> delete VPC```
- VM/Instance creation এর সময়, **`boot disk`** একটা option দেখতে পাই। যেই disk থেকে VM boot হয়, তাকেই boot disk বলে।

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
