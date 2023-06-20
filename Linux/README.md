Name of some Linux filesystems - Ext4, XFS, Btrfs, JFS, NTFS

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


![lvm-diagram-linux-training-academy](https://github.com/Mohsem35/DevOps/assets/58659448/07ef6124-eef7-4ded-936b-7717f281cb77)
