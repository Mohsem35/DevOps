### AWS EC2 with Terraform

We need to create 2 files `main.tf`, `provider.tf`

```hcl
# main.tf
resource "aws_instance" "webserver" {
    ami = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"
    tags = {
        Name = "webserver"
        Description = "An Nginx WebServer on Ubuntu"
    }
}
user_data = <<-EOF
            #!/bin/bash
            sudo apt update
            sudo apt install nginx -y
            systemctl enable nginx
            systemctl start nginx
            EOF
key_name = aws_key_pair.web.id
vpc_security_group_ids = [ aws_security_group.ssh-access.id]
}

# login access to ec2 instance
resource "aws_key_pair" "web" {
    public_key = file("/root/.ssh/web.pub")

# route access
resource "aws_security_group" "ssh-access" { 
    name = "ssh-access"
    description = "Allow SSH access from the Internet" 
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# output variable for getting public ip address
output publicip {
    value = aws_instance.webserver.public_ip
}
```
```hcl
# provider.tf
provider "aws" " {
    region = "us-west-1"
}
```

```shell
terraform plan
terraform apply
```

### Terraform Provisioners

By default, provisioners are run after the resources are created, এইটাকে বলা হয় `create time provisioner`

Terraform provisioners are used to **execute scripts or commands on a remote resource** after it has been created by Terraform. They are often used to perform tasks such as **installing software, configuring settings, or initializing data**. Provisioners can be helpful when the desired configuration cannot be achieved solely through Terraform's native resource attributes or when interacting with resources outside of Terraform's control.

There are two main types of provisioners in Terraform:

1. **Local-exec Provisioner**: This provisioner runs commands on the machine running Terraform. It's useful for tasks like initializing local data or performing actions on the local machine.

```hcl
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"

  provisioner "local-exec" {
    command = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
  }
}
```

2. **Remote-exec Provisioner**: This provisioner connects to the created resource via **SSH** or **WinRM** and executes commands on that remote resource. It's commonly used for tasks like installing software or configuring settings on a remote server.


**`remote-exec`** command execute করার জন্য, there should be **network connectivity between the local machine and the remote instance**. 

```hcl
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install nginx -y",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("/root/.ssh/web")
      host        = self.public_ip
    }
  }

  key_name               = aws_key_pair.web.id
  vpc_security_group_ids = [aws_security_group.ssh-access.id]
}

resource "aws_key_pair" "web" {
  # Define your AWS key pair configuration here
}

resource "aws_security_group" "ssh-access" {
  # Define your SSH access security group configuration here
}
```


### Provisioner Behavior

Terraform by default **doesn't encourage** to use provisioner 

**native feature** use করতে বলে like AWS **`user_data`**