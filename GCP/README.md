## Cloud Concepts

2 টা core components দিয়ে cloud বানানো possible
1. VXLAN
2. Opne vSwitch

- On premise pc এর সাথে cloud এর কনেক্ট হবে **`BGP(border gatweway protocol)`** এর মাধ্যমে
- Overlay network দিয়ে multiple container কে কিভাবে add করা যায় শিখানো হয়েছে
- VPC region boubder হয়। VPC, **`multi-region`** তে span করা যায় **`না`**। অর্থাৎ, VPC কেবল একটা region তে deploy করা যায়, multi-region তে deploy করা যায় না

Q. Cloud এ যেকোন resource deploy করতে হলে, 1st requirment কি? - VPC বানাতে হবে

Q. VPC টা কোথায় deploy করব? - customer কোন location এ আছে

Q. একটা region এ database আছে, আরেকটা region এ কিভাবে data replicate করব? - possible না 

যেকোন cloud এর ২ টা part থাকে
1. **`compute cluster`**: এখানে শুধু computer server থাকে
2. **`storage cluster`**: SSD/HDD

এরা যদি আলাদা region এ থাকে, তবে latency হবে। তাই, same region তে application এর সবকিছু থাকলেই ভাল

- VPC বানানোর পরে **`multiple segment`** বানাতে হয়। multiple segment কে **`subnet`** বলে
- প্রতিটা data center কে বলা হয় **`AZ(availabilty zone)`**
- প্রতিটা data center আবার **`physical wire`** দিয়ে নিজেরা connected 
- Multiple AZ(availabilty zone)/Data Center নিয়ে **`region`** গঠিত হয়
- 
