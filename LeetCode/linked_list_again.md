

Node Class:

| data |
|------|
| next |


LinkedList Class:

| head |
--------
| tail |
--------
| size |




Shajal Approach:
-----------------
class Node(self,data):
    self.data=data
    self.next=none

class LinkedList:
    def __init__(self):
        self.head=none
        self.tail=none
        self.size=0

    def insert(self,data):
        n=Node(data)                   //প্রথমে node create করব
        if self.size == 0:             // self.size=0, মানে এখনো কোন node নাই
            sel.head=n
            self.tail=n
        else:
            self.tail.next = n
            self.tail = n
        self.size += 1              // size বাড়তে থাকবে

        //another approach else
        else:
            temp = self.tail        // tail always update হবে
            temp.next = n
            self.tail = temp
        self.size += 1

    //singly LinkedList দিয়ে queue implementation করা যায়
    def search(self,data):
        temp = self.head
        while(temp):
            if temp.data == data:
                return temp
            temp = temp.next

    def pop(self):
        temp=self.head
        self.head=temp.next
