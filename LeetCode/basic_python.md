Time complexity:
----------------

abstract concept
Number of operations বুঝায়  / data কে process করতে কতটা operations লাগবে তা বুঝায়
So, operation count = time complexity why?
কারণ, এতে operation count বের করা যায়

Note: operation count platform independent. অর্থাৎ কোন processor(i5/i9/i3) এ চলবে তার উপরে করে না, depend করবে input size(size_of_array) এর  উপরে

execution time: পুরা program চলতে কত টাইম লাগে
compile time: Program টাকে machine code এ convert করতে কত সময়  লাগে

২ pointer approach
i, j
swap করতে 3 টা operations লাগবে, একটা memeory থেকে আরেকটা memory তে data নিয়ে যাওয়া

Swap time complexity: O(1)
O(3) -> constant
যেহেতু swap করতে ৩ টা opeartion ই লাগব, তাই আমরা লিখতে পারি swap time complexity O(1)
কোন কিছুর time/memory complexity constant হলে, O(1)

complexity constant মানে, operation কাউন্ট ও same
core i5 তে 5 টা operations লাগলে, core i9 তে  5  টা operations লাগ

Data structure: data কে কিভাবে রাখতেছি, data রাখার strategy/structure
Algorithm: Data manipulation করার জন্য way

Programming language গুলোতে by default কিছু DS দেওয়া থাকে। ex- list, dictionary/hashmap, tuple, set

Note: Python এর 'list' আর C এর 'array' মধ্যে কোন difference নাই, because of 'index'

List: duplicate entry থাকবে
Python এ list টা কে stack(LIFO) হিসাবে ব্যবহার করা যায়

a=[1,2,3,4,5,3]
a.append(4)
a.pop(11)
এগুলো হল data structure methods

যখন কোন জিনিষকে সার্চ করব, তখন worst case চিন্তা করব। computer science এ best case বলে কিছু নাই
worst case কে define করার জন্য computer science এ Notation আছে।
Big-O

List push()/pop() time complexity: 0(1)
কারণ push(), pop() করতে একটার বেশি opeartion লাগতাছে না

Dictionary/Hashmap:
bucket={}
bucket[1]="hello"
bucket[2]="maly"

dictionary insert/search time complexity: O(1)

Two sum problem:
[15,2,11,7,8]
Array দেওয়া আছে, কোন 2 টা element যোগ করলে target = 9 হবে?

# starting point টাকে pivot ধরে কাজ করতেছি
# একবার traverse করা শেষ হইলে, pivot point change করব

