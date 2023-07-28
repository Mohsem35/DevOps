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
