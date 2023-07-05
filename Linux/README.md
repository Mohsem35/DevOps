## Linux Commands to Remember

- To add a content to a file with cat(redirect) .

Run **`cat > /path/to/<filename>`** command:
```
cat > Africa/Egypt/Cairo/City.txt
 Cairo
`Type Ctrl + d from keyboard`
```

- Most of the commands internal or external come bundled with man pages which provides information about the command in detail (with examples, usecases and with command options)

**`Syntax: man <command>`**
```
man date
```
- To check the home directory for a particular user say bob
```
grep bob /etc/passwd | cut -d ":" -f6
```

- To change the shell for bob from **`Bash`** to **`Bourne Shell`**
```
chsh -s /bin/sh bob
```

- Create a new environment variable called **`PROJECT=MERCURY`** and make it persistent by adding the variable to the **`~/.profile`** file
```
echo export PROJECT=MERCURY >> ~/.profile
```
- Set an alias called **`up`** for the command **`uptime`** and make it persistent by adding to **`~/.profile`** file.
```
echo alias up=uptime >> ~/.profile
```

- Update Bob's prompt so that it displays the date as per the format below: Example: **`[Wed Apr 22]bob@caleston-lp10:~$`** Make sure the change is made persistent. 
```
PS1='[\d]\u@\h:\w\$'
or
echo 'PS1=[\d]\u@\h:\w$' >> ~/.profile
```
![bash-prompt3](https://github.com/Mohsem35/DevOps/assets/58659448/172a13dd-3fb1-4e70-95d9-0e9442b40f86)

- To check if the location of the command can be identified. Use the which command
**`Syntax: which <command>`**
```
$ which obs-studio
```

- Speaking about the environment variables, when a user issues an external command into the shell, the shell uses path variable to search for these external commands
- To see the directories defined in path variable. Use the command **`echo $PATH`**.
```
$ echo $PATH
```




Name of some Linux filesystems - Ext4, XFS, Btrfs, JFS, NTFS

## Linux Kernel


If you have worked with any operating system, you have run into the term kernel.
- The Linux kernel is monolithic, this means that the kernel carrries out CPU scheduling, memory management and several operations by itselfs.
- The Linux Kernel is also modular, which means it can extends its capabilities through the use of dynamically loaded kernel modules

![linux-kernel](https://github.com/Mohsem35/DevOps/assets/58659448/3b18cd1b-5c3f-4700-8c11-46cca8a2041d)


![ezgif com-webp-to-jpg](https://github.com/Mohsem35/DevOps/assets/58659448/5dabcb77-0fbe-4e60-a652-f8685fb42fdb)

#### Mount
In the context of operating systems, `mount` is a command and process that allows a **file system to be attached** to a specific directory (known as the "mount point") 
within the file hierarchy of the operating system. 
When a file system is mounted, it becomes accessible and usable by the operating system and its applications.

#### LVM - Logical Volume Manager

Linux File management অথবা Partition করার জন্য LVM(logical volume manager) help করবে

LVM stands for Logical Volume Manager. It is a software-based disk management system used in Linux distributions to manage disk volumes and 
provide **advanced storage features**. LVM allows for the creation, resizing, and deletion of logical volumes, which are virtual partitions that can span multiple 
physical disks.

Some key components of LVM include:

`Physical Volume (PV):` A physical disk or disk partition that is added to the volume group. 
These physical volumes can be hard disk drives **(HDDs)**, solid-state drives **(SSDs)**, or any other storage device recognized by the Linux kernel.

`Volume Group (VG):` A pool of physical **volumes combined together** to form a larger storage space. Logical volumes are created within volume groups.

`Logical Volume (LV):` A **logical partition** that resides within a volume group. Logical volumes are similar to traditional disk partitions but 
offer more flexibility. They can be resized, moved, and even span across multiple physical volumes.

![rsz_1247137860-07ef6124-eef7-4ded-936b-7717f281cb77](https://github.com/Mohsem35/DevOps/assets/58659448/ccacd9c4-bdaf-4d0e-a032-a7cf5a4a6e70)



#### RAID - Redundant Array of Independent Disks

It is a `data storage technology` that combines multiple physical hard drives into a single logical unit to improve performance, reliability, or both. The drives in a RAID array are organized and managed in a way that provides certain benefits over individual drives.

RAID 0: This level, also known as striping, **splits data across multiple drives without redundancy**. It improves performance by allowing simultaneous read and write operations on multiple drives. However, it does not provide any fault tolerance, meaning that if one drive fails, all data is lost.

RAID 1: Also known as **mirroring**, RAID 1 duplicates data across multiple drives. Each drive contains an identical copy of the data, providing redundancy and increased reliability. If one drive fails, the other(s) can still function and serve data. However, the capacity of the array is limited to the size of a single drive.

RAID 5: RAID 5 uses block-level striping with **distributed parity**. Data and parity information are spread across multiple drives in the array, providing both performance and redundancy. If a drive fails, the parity information can be used to reconstruct the data. RAID 5 requires a minimum of three drives.

RAID 6: RAID 6 is similar to RAID 5 but uses **double distributed parity**. It can withstand the failure of two drives simultaneously, providing better fault tolerance compared to RAID 5. RAID 6 requires a minimum of four drives.


Both SAN and network-attached storage (NAS) are methods of managing storage centrally and sharing that storage with multiple hosts (servers). However, NAS is Ethernet-based, while SAN can use Ethernet and Fibre Channel.

Q. What is iSCSI?

### Bash Scripting

What is a shell?

- Linux shell is a program that allows text based interaction between the user and the operating system, this interaction is carried out by typing commands into the interface and receving the response in the same way.
- The Linux shell is a powerful tool with which you can navigate between different locations within the system, however when you login to the shell the very first directory you were take into is your home directory.

There are different types of shells in linux, some of the popular ones are below
- Bourne Shell (sh)
- C Shell (csh or tsh)
- Korn Shell (ksh)
- Z Shell (zsh)
- Bourne again shell (Bash)

![rsz_ezgif-4-7fb9fabb6c](https://github.com/Mohsem35/DevOps/assets/58659448/7d20cc3b-ec80-42db-8f5b-31ece79f6d32)



- Shell Scripts have a `.sh` file extension
- Shell = Program, what we type in terminal that interprets and executes commands. Translates commands to OS Kernel
- **Sh** (Bourne shell) - /bin/sh
- **Bash** (bourne again shell) - Improved version of sh
- Bash is a programming language and shell program
- In OS, there could be multiple shell program. We need to tell OS which shell program to use by **shebang** (#=sharp,!=bang)
```
#!/bin/sh
#!/bin/bash - is the location of bash program
#!/bin/zsh
```

![logo](https://github.com/Mohsem35/DevOps/assets/58659448/d04fe698-3753-4e0e-9660-00b3a4f6f2a5)


##### File conditions in scripting:
```
-d = checks if file is a directory
-f = checks if file is an ordinary file
-r = checks if file is readable
-w = checks if file is writeable
-x = checks if file is executeable
-e = checks if file exists
-s = checks if file has size greater than 0

```

##### Number conditions:
```
-eq = value of two operands are equal or not
-ge = comparison between two operands
-lt = less than
-gt = greater than
-ne = not equal
```
##### String Conditions:
```
== equal
!= not equal
-z = checks if a string is empty (has zero length).
-n = checks if a string is not empty (has a length greater than zero)
```


##### Read user input:

```
#!/bin/bash

read -p "please enter password: " user_pwd
echo "thanks for your password $user_pwd"
```

$* = represents all arguments as a single string

$# = total number of arguments provided

#### Bash environment variables

To print SHELL environment variable/To check which shell being used
```
echo $SHELL
```

To see a list of all environment variables. Run env from the terminal
```
env
```

To set an environment variable we can use the export command. To make the value carry forward to any other process.
```
export OFFICE=caleston
```
To persistently set an environment variable over subsequent login or a reboot add them to the **`~/.profile`** or **`~/.pam_environment`** in the users home directory.
```
echo "export OFFICE=caleston" >> ~/.profile (or)
echo "export OFFICE=caleston" >> ~/.pam_environment
```
To check the value of a environment variable called LOGNAME
```
echo $LOGNAME
```



