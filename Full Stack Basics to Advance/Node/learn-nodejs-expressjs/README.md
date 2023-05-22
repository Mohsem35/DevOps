- আমাদের সর্বপ্রথম `context বুঝতে হবে`, মানে code কার জন্য লিখতেছি সেইটাই সবচেয়ে important। `কোড server সাইডে execute হবে, নাকি client সাইডে execute হবে বুঝতে হবে`
- next.js - client side rendering and server side rendering দুইটাই করতে পারে
- React(JavaScript) এ যা যা হচ্ছে, সব browser ই হচ্ছে
- React `fs.readFile()` code কাজ করবে না, কারণ browser এর direct `file access` করার permission নাই  `due to security threat` কিন্তু Express.js এ কাজ করবে। Express.js এর file access করার permission আছে. 
- webpage inspect করলে browser একটা temporary file source দেখায়, but `it's not the absoulate path`

npm - Javascript Package Manager

How to install a npm package:
```
npm install <package_name>
```
Run the project:

```
npm run dev   // development সার্ভারে(localhost) থেকে আমি code run করতেছি
```
কিন্তু আমি code deploy করব কোন server অথবা cloud এ. তাহলে code আর ও minimize করতে হবে

```
npm run build    // minified version বানায় যেইটা production build করল
```
For checking everything is OK:
```
npm run preview
```

> **_NOTE:_** DevOps এ কাজ করার টাইমে, `build stage e errors show করবে`, তাই developer এর সাথে communicate করতে হবে 

'React' is a library but 'Angular' is a framework. Angular এর ভিতরে React use করতে পারবেন 

#### Installation 
[How to initaially start an express project](https://www.youtube.com/watch?v=huc9RWb0yX4&ab_channel=Simplilearn)

![1 f7ztMaMM0etsFHpEfkdiwA](https://github.com/Mohsem35/DevOps/assets/58659448/2da64e3e-43c9-4062-a83b-4c6a5c1c62f7)


https://www.npmjs.com/package/express

