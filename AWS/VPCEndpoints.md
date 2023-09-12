search `endpoints` in seach box -> create endpoint -> name(test) -> service category(EC2 instance connect endpoint) -> vpc(`vpc-a`) -> security groups -> group name(launch-wizard-1) 
-> subnet(`web-subnet-a`) -> create endpoint

- vpc create করার সময় DNS enable করতে হয়

vpc -> select `vpc-a` -> actions -> edit vpc settings -> DNS settings -> enable dns hostnames -> save
