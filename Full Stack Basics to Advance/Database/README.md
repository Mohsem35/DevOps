_**Dynamic data**_ refers to information that is `not static or fixed, but rather changes or updates over time.` It is data that can be modified, added, or removed as new information becomes available or circumstances change
Examples of dynamic data include:

- `Sensor data:` Readings from sensors such as temperature sensors, pressure sensors, or motion sensors that continuously provide updated information.
- `Financial data:` Stock prices, currency exchange rates, or market indices that fluctuate throughout the day.
- `Weather data:` Current weather conditions, forecasts, or radar imagery that change based on real-time weather patterns.
- `Website content:` Content on websites that can be dynamically generated based on user input, database queries, or other factors.
- `Social media feeds:` Posts, comments, and updates on platforms like Twitter or Facebook that are constantly changing as users interact with the platform.

**_Q. What is a database?_** 

A database is an `organized collection of structured data stored and managed in a systematic way.` It is designed to efficiently store, retrieve, and manage large volumes of information. Databases are widely used in various applications and industries to handle data in a structured manner, allowing for efficient data manipulation, storage, and retrieval.

**_Q. What is ORM(Object Relational Mapping)?_**

ORM stands for Object-Relational Mapping. It is a `programming technique that enables developers to interact with databases using an object-oriented paradigm instead of writing SQL (Structured Query Language) queries directly.` ORM tools provide a high-level abstraction layer that `maps objects in the application code to tables in the database,` allowing developers to interact with the database using familiar programming concepts like classes, objects, and methods.

**_Q. Why there are so many data types in database?_**

Databases support different data types to `accommodate the diverse types of information that need to be stored and processed.` Each data type has specific characteristics and is designed to handle different kinds of data in an efficient and meaningful way.Here are some reasons why there are multiple data types in databases:

- Data Representation
- Data Validation
- `Storage Efficiency`
- Data Manipulation
- Query Optimization

### MySQL

Default port: 3306

[MySQL installation in node.js server](https://www.npmjs.com/package/mysql2)

Installation:
```
npm install --save mysql2
```
First Query: যে কোন একটা .js ফাইলে গিয়ে নিচের configuration code declare করে আসব 
```
// get the client
const mysql = require('mysql2');

// create the connection to database
// node.js server দিয়ে আমি DB থেকে data আনতেছি MySQL থেকে
const connection = mysql.createConnection({
  host: 'localhost',
  user: '<db_user>',
  database: '<db_name>',
  password: 'example',
  port: '<port_number>'
});

// simple read query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    connection.end() // এই লাইন না লিখলে সার্ভার connection ধরে রাখবে 
  }
);

// simple insert query
connection.query(
  'INSERT INTO user(name) VALUES("john")',      // CLI query code direct এখানে use করা যাবে
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    connection.end()
  }
);
```

https://github.com/prisma/prisma

Installation Process:
https://www.npmjs.com/package/mongodb

```
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://root:example@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = '<db_name>';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('<collection_name>');

// Find and convert to array
  const findResult = await collection.find({}).toArray();

  // the following code examples can be pasted here...
  console.log(user)

  return 'done.';
}

main()
  .then(() => {})
  .catch(() => {})
  .finally(() => client.close());

```


Elastic Installation Process:
https://www.npmjs.com/package/@elastic/elasticsearch

