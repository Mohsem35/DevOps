
Installation process:
https://www.npmjs.com/package/mysql2

```
npm install --save mysql2

```

```
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  passwoed: 'example',
});

// simple read query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    connection.end()
  }
);

// simple insert query
connection.query(
  'INSERT INTO user(name) VALUES("john")',
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

