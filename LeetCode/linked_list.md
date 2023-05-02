যে  কোন program, computer এ process হিসেবে run হয়


### Process Control Block (PCB):

PCB is a data structure used by the operating system to manage and keep track of processes in a computer system.
It is a kernel-level data structure that contains all the information needed to manage and control a particular process.

Each process in the system is associated with a unique PCB that stores important information about the process, including its

1.process ID(unique number)
2.process state(new/running/waiting),
3.cpu registers
4.priority,
3.program counter,
4.memory allocation,
5.input/output (I/O) status,
and other relevant details.
The PCB serves as a link between the process and the operating system, enabling the operating system to manage the process and provide resources to it as needed.

The PCB is a critical component of process management in operating systems and plays a crucial role in ensuring that processes run efficiently and without conflicts.
By maintaining detailed information about each process in the system, the operating system can allocate resources, schedule processes, and manage memory and other system resources more effectively.

Contiguous array:
-----------------

contiguous array is a data structure in which elements are stored in contiguous or sequential memory locations. In a contiguous array, each element occupies a fixed amount of memory,
and the position of each element is determined by its index in the array.

Contiguous arrays are also known as static arrays or fixed-size arrays because they have a fixed size and cannot be resized dynamically during program execution. To modify the size of a contiguous array, a new array must be created, and the elements from the old array must be copied over.

a=[1,2,3,4,5]
array_size=5
এখানে, python 10 size এর array memory allocate করবে, যেহেতু a এর array elements এখানে 5  টা
এই 10 size array fullfill হয়ে গেলে , array_size previous সাইজের 2x memory allocate করবে 2 x 10 = 20 এবং আগের  সব ডাটা কপি করে এনে এই নতুন 20 array_size তে allocate করবে।
array_size=20(now)

note: python এ যে size এর array declare করা হয়, তার 2x memory allocate করে
approach:
1. double size allocate
2. double full হইলে, তার  double allocate
3. then copy operation

array time complexity: O(1)
linked list time complexity: O(n)


Summation in mathematics:
------------------------

If,f(i)= x^2
n=5
∑f(i)=f(1^2)+f(2^2)+f(3^2)+f(4^2)+f(5^2)
i=1
এই euquation টাকে python for loop এ convert করতে চাইলে
```
sum=0
for i in range(1,6):
    sum=sum+(i*i)
```
If,f(i)=i
n=5
∑f(i)=f(1)+f(2)+f(3)+f(4)+f(5)
i=1
এই euquation টাকে python for loop এ convert করতে চাইলে 
sum=0
for i in range(1,6):
    sum=sum+i


Summation এর ভিতরে summation:
---------------------------

g(i)=2i
f(j)=j^2

তাহলে এইটার equation টা হবেঃ
n=5
   n=5
∑f(∑g(i))
   i=1
j=1

এখানে আগে ভিতরের equation টা calculate করতে হয়,then বাহিরের equation নিয়ে কাজ
=f1(g(1)+g(2)+g(3)+g(4)+g(5))+
f2(g(1)+g(2)+g(3)+g(4)+g(5))+
f3(g(1)+g(2)+g(3)+g(4)+g(5))+
............................
............................
=5+5+5+5+5
25
gof formula দিয়ে চিন্তা করব

তাহলে এইটার python এ code হবে অনেকটা এরকম
for i in range(1,6):
    fro j in range(1,6):
    -------------
    -------------

nested loop time complexity: 0(n^2)


gof formula:
------------
Let f: A→ B and g:B→ C be two functions then gof: A→ C is defined by gof(x) = g(f(x))

Data type:
----------
2 ধরনের ডাটা টাইপ থাকবে
1.primitive(int,float,bool etc.)
2.user defined(class)

Example of user defined data type:
class student:
    def __init__(self,name,roll):
        self.name=name
        self.roll=roll

s1=student("shahriar",1407292)
student class এ __init__ এখানে default constructor


note: python এ প্রতিটা class এ একটা constructor থাকতেই হবে must।

class vs object:
----------------
class: বাড়ির blueprint
object: blueprint থেকে যেই বাড়ি তৈরি হইতাছে সেইটা

class person:
    def __init__(self,name,age):
        self.name=name
        self.age=age

p1=person("maly",25)
p2=person("ahmed",23)

Linked list:
------------

A linked list is a linear data structure that includes a series of connected nodes. Each node stores the data and the address of the next node.
You have to start somewhere, so we give the address of the first node a special name called HEAD. Also, the last node in the linked list can be identified
because its next portion points to NULL.

Linked lists can be of multiple types: singly, doubly, and circular linked list.


Q: একটা linked list বানানোর জন্য কয়টা basic operations(method) থাকা লাগবে?
1. নতুন node বানানো
2. delete method
3. node search method
4. push
5. pop

class তাহলে 2 টা লাগতাছে
1. node(value) এর information carry করবে
2. linkedlist তার self information carry করবে

a=[1,2,3,4,5]
array কে linked-list তে convert করতে হলে প্রথমে traverse করতে হবে
1st element টা একইসাথে head এবং tail


NODE CLASS:
----------
```
class Node:
    def __init__(self, data):          // A node of a linked list has two things in it. (1) data value, (2) reference to the next node.
        self.data = data
        self.next = None
```

CREATING A LINKED LIST:
-----------------------
```
class Linked_List:                 //Initially the linked list contains the head node.This is referenced as the start node/first node of the linked list.
    def __init__(self):
        self.head = None
        
    def insert_at_begining(self, data):
        node = Node(data)          // created node object
        node.next = self.head
        self.head = node
```  

ADDING ELEMENTS AT THE END OF A LINKED LIST:
This is a time-consuming process because we will traverse the complete linked list.
As we reach the tail of the linked list, we will insert the node at the final position. we will make the 'node object' of the 'node class' and make the temp pointer for traversing the linked list.
reaching the end of the linked list we will stop traversing. Assign the reference of the tail of the linked list to the above created node object.

```
def insert_at_end(self, data):
    node = Node(data)
    if self.head is None:
        self.head = node
        return
    temp = self.head
    while temp.next is not None:
        temp = temp.next
    temp.next = node
```

TRAVERSING A LINKED LIST:
Linked list traversal is the process of visiting each node of the linked list. We do it by making the start pointer refer as temp start from the head of the linked list.
We visit each node and keep updating the temp pointer to the next node.

def traverse(head):
    temp = head


if head is None:
    print("empty linked list")
while temp is not none:
    print(temp.data)
temp = temp.next


https://www.topcoder.com/thrive/articles/linked-lists-in-data-structure-using-python




