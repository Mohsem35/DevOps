VSCode এর `Remote - SSH` extension লাগবে 

```
code .
```

- `.ssh` directory তে গেলে `config` নামের একটা file পাওয়া যাবে, যেইটা তে সব bash shell host configuration save করে রাখতে পারব 

#### Step 1: Open the config file and paste the following configurations
```
sudo su
vim /home/maly/.ssh/config
```

```
Host poridhi_class 
  Hostname <gcp_instance_public_ip>
  User test
  IdentityFile /home/maly/.ssh/test
```

#### Step 2: Now connect from VS Code

![Screenshot from 2023-09-06 23-12-40](https://github.com/Mohsem35/DevOps/assets/58659448/7c7bb8d7-0a4e-4919-8af7-4bd49d871c03)

Click the left-side bottom corner named `Open a Remote Window` -> `Connect to Host` -> `Configure SSH Hosts` -> select `poridhi_class` from vscode search box
