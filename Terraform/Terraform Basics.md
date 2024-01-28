### Using Terraform Providers

After writing Terraform configuration file, `terraform init` command (within the configuration directory file) downloads and installs plugins for the providers within the configuration.

The providers can be aws, azure or local providers

Terraform uses plugin-based architecture. Terraform providers are distributed by HashiCorp and are publicly available in the Terraform Registry. 

There are 3 tires of providers

1. **Official provider**: Owned and maintained by HashiCorp
2. **Partner provider**: Owned and maintained by third-party technology company and gone through partner provider process with HashiCorp
3. **Community providers**: HashiCorp community is responsible

Plugins are downloaded in hidden directory

```shell
ls /root/terraform-local-file/.terraform 
```

### Configuration Directory

যেই directory তে `.tf` extension সহ Terraform এর configuration ফাইল পাওয়া যাবে সেইটাই configuraton directory

একটা singel configuration ফাইলে multiple configuration blocks থাকতে পারে এবং সেইটার নাম হবে **`main.tf`**