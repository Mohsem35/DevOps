//code direct copied from npm express documentation
// 1st server বানায়ে ফেললাম

const express = require("express");
const path = require("path");

const app = express();
// নিচের লাইনের জন্য, server body read করবে.  POST/PUT request এর জন্য এদের দরকার 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let mytodo = {
  id: 1,
  title: "title no 1",
};

//req = request, res = response
// res.send() expectation হচ্ছে আপনি শুধু text পাঠাবেন, JSON পাঠাবেন না
//localhost:3000
app.get("/", function (req, res) {
  res.json(mytodo);
});

//localhost:3000/json
// app.get("/json", function (req, res) {
//   res.json({
//     source: "server",
//     message: "hello",
//   });
// });

//WORKING WITH FS
// sendFile will go here
// '/html' endpoint এ গেলে, index.html page show করব এবং কোন directory তে এইচটিএমএল file আছে তা চিনাই দিতে হবে 
//__dirname = current directory
//check this documentation: https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get("/html", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// একই route/endpoint এর under এ GET, POST request ২ টাই করা যায়
// কেউ যদি আমাকে POST request করে, তাহলে আমি এই function টা call করব
// POST request এ bode পাঠানো mandatory না
// res.json() মুখস্থ ফরম্যাট for GET, POST, PUT everything
app.post("/", function (req, res) {
  const body = req.body;
  body.id = 101;
  res.json(body);
});

// request এর মধ্যে body নামের option আছে like 'req.body', যেটাতে content থাকে
// by default, server কখন body read করে না
// process: (1) at first we took the body from request (2) take the title from body (3) update the title
app.put("/", function (req, res) {
  const body = req.body;
  const newTitle = body.title;

  mytodo.title = newTitle;
  res.json(mytodo);
});

app.listen(3000);
