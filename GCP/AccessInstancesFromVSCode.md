VSCode এর `Remote - SSH` extension লাগবে 

```
code .
```

- `.ssh` directory তে গেলে `config` নামের একটা file পাওয়া যাবে, যেইটা তে সব bash shell host configuration save করে রাখতে পারব 

Click the left-side bottom corner named `Open a Remote Window` -> `Connect to Host` -> `Configure SSH Hosts`

```
Host gitlab.celloscope.net
  Hostname <public_ip_gcp_instance>
  User maly
  Port 22
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/maly
```
