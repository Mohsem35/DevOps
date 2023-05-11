//code direct copied from npm express documentation
// 1st server বানায়ে ফেললাম

const express = require("express");
const path = require("path");

const app = express();

//req = request, res = response
// res.send() expectation হচ্ছে আপনি শুধু text পাঠাবেন, JSON পাঠাবেন না
//localhost:3000
app.get("/", function (req, res) {
  res.send("Hello World");
});

//localhost:3000/json
app.get("/json", function (req, res) {
  res.json({
    source: "server",
    message: "hello",
  });
});

// sendFile will go here
// '/html' endpoint এ গেলে, index.html page show করব
//__dirname = current directory
//check this documentation: https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get("/html", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// app.listen(port);
// console.log("Server started at http://localhost:" + port);
app.listen(3000);
