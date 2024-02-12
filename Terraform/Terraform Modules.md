### What are modules?

Terraform modules are **self-contained packages** of Terraform configurations that are **managed as a group**. They allow you to encapsulate **reusable infrastructure components and configurations**, making it easier to organize, maintain, and share your Terraform code.

Any **configuration directory containing a set of configuration files** is called a module

```hcl
# main.tf
module "dev-webserver" {
    source = "../aws-instance"
}
```

### Creating and Using a Module

Modules are comparable to libraries or packages that are used in most programming languages.

### Using Modules from Registry

