
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