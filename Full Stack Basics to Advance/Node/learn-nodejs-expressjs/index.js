const express = require("express");

const app = express();
// নিচের লাইনের জন্য, server body read করবে.  POST/PUT request এর জন্য এদের দরকার 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let mytodo = {
  id: 1,
  title: "title no 1",
};

//GET
app.get("/", function (req, res) {
  res.json(mytodo);
});


//POST
// body তে যা কিছু request করতেছি সেইটাই আমারে response হিসেবে show করতাছে 
app.post("/", function (req, res) {
  const body = req.body;
  body.id = 102;
  res.json(body);
});

//PUT
app.put("/", function (req, res) {
  const body = req.body;
  const newTitle = body.title;

  mytodo.title = newTitle;
  res.json(mytodo);
});

app.listen(4000);
