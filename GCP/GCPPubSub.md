- `Google SDK` use করে `node.js` দিয়ে pub/sub model introduce করা হইছে, যাতে `service to service` communicate করা যাইতে পারে।
- যেই চ্যানেলে message গুলি আইসা জমা হইতাছে তাদেরকে বলা হয় **`topic`** GCP তে

- RestAPI reponse দেয় request পুরাটা processing করার পরে, কিন্তু Pub/Sub হচ্ছে information processing হোক বা না হোক সে response পাঠাই দিচ্ছে
- Pub/Sub, RestAPI থেকে অনেক বেশি faster

**`fire and forget`** architecture

kafka = PubSub + Queue

**`vertical scaling`** : infrastructure বাড়ানো like ram 

**`horizontal scaling`** : নতুন instance বাড়ানো 

#### GUI

search `pubsub` the search box -> click + button for `create topic` -> `topicid(topic-1)` -> create


`topic-1` তৈরি হয়ে গেল। এখন dashboard এর `Topic ID` তে টিক করলে `Subscription ID(topic-1-sub)` দেখাবে 

Dashboard এ অনেকগুলো tab থাকবে like subscriptions, snapshots, metrics, details, messages. আমরা `messages` tab এ যাব, একটা message publish করতে চাচ্ছি। 

publish message -> message body -> `meassge(write some message)` -> publish

- তার মানে message টা এখন `pub/sub` তে আছে

![Untitled-2023-09-01-2108](https://github.com/Mohsem35/DevOps/assets/58659448/0b8ee514-7774-4f78-ac8e-fb3e0846a778)


`topic-1-sub` তে যাব, কারণ কোন একটা service ত থাকতে হবে যে আমার message টা listen করেতে পাবে। 

`topic-1-sub` -> `pull`(কি কি message আছে pull করতে পারব) -> দেখব আমরা যেই message টা publish করেছিলাম ওইটা আসছে 

- sanity check এর জন্য আমরা যদি আবার message publish করি, তাহলে দেখব যে আবার message আসছে

![Untitled-2023-09-01-2108](https://github.com/Mohsem35/DevOps/assets/58659448/72561951-18ca-494a-968a-5c8c159b7f76)
