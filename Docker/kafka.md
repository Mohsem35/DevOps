Kafka তে আমরা **`Topic`** এ information send করি, Redis এ যেটাকে channel বলে। এই Topic তে data partitioned হয় 

**`zookeeper`**: কে leader, কে follower, কে consumer, কে producer, Kafka server গুলোর মধ্যে information sync এ আছে কিনা নিজেদের মধ্য communicate করে(gossip)এইসব কিছুর info রাখে. zookeeper is the manager of kafka 

Queue is a `one-to-one` communication model where a message is consumed by **`one recipient`**. one time message, একবার consume হয়ে গেলে next time এই message আর দেখা যাবে না 

Pub/Sub is a `one-to-many` communication model where a message is broadcasted to **`multiple subscribers`** interested in a specific topic. new কোন recipient আসলে সে previous message গুলো দেখতে পাবে, মানে একই জিনিষ
বার বার consume করতে পারবে। 

Kafka at a time `queue` and `pub/sub`

1. suppose the **`producer publishes`** an information(abc) to Kafka server, the `consumer group1` will get that information one time and it will not consume the same information again = **`Queue Model`**. একটা group এর কাছে একটা
   information একবার ই যাচ্ছে
   
2. if a new group appears named `consumer group2`, it will get the information of abc = **`Pub/Sub Model`**. মানে new group আসলে সে previous information পাবে 

![Untitled-2023-10-08-1934](https://github.com/Mohsem35/DevOps/assets/58659448/44de4e3b-8d6f-49aa-9b3a-af4fab330f48)


### How is data being stored in Kafka? (data management)


যা information kafka তে send করব, সবকিছু kafka **`append only log`** use করবে data save করার জন্য। যেহেতু append করতেছি, তারমানে insert, arrary index shifting এইসব কোন কিছু করতে হবে না। 
- সবার শেষে গিয়ে নতুন information টা add হবে, যেইটা kafka করে । ফলে operation অনেক বেশি fast হবে
- append করতে থাকলে data volume increased হইতে থাকবে, data size অনেক বিশাল হবে। solution হচ্ছে partition


 ![Untitled-2023-10-08-1934](https://github.com/Mohsem35/DevOps/assets/58659448/35095c7d-20b3-4c6a-b4de-5212ea278345)

 - partition এর data type অনুযায়ী different consumer group, data consume করবে
 - logical separation থাকবে. suppose, partition1 এর সব data পাবে consumer-group1 এর c1 and partition2 এর সব data পাবে consumer-group1 এর c2
 
কিন্তু যদি data volume বেশি হয়ে যায়, তাহলে এই concept manage করা কঠিন হয়ে যাবে, এইখানে আসবে **`distributed system`**. Multiple Kafka node লাগবে 

![Untitled-2023-10-09-1827](https://github.com/Mohsem35/DevOps/assets/58659448/1d3fef74-57c8-40f5-96b5-f3790652b89e)
