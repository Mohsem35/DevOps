- প্রতিটা region এর জন্য  default quota থাকে। ধরি, us-east-1 region তে 5 টার বেশি subnet বানাতে পারব না, তখন 6 no subnet create করতে গেলে, GCP subnet create করতে দিবে না।
- Cloud এ যখন কোন resource/VM বানাই, তখন DAG(Directed Asylic Graph) তৈরি হয়, মানে dependency grapy। আগে child গুলো কে delete করতে হবে, তারপর parent কে delete করতে পারব
  1. Suppose, VPC delete করতে চাচ্ছি, তাহলে 
  2. 
