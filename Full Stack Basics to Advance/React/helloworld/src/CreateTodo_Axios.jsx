//https://www.npmjs.com/package/axios
//$ npm install axios

import axios from "axios";

import { useState } from "react";

export const CreateTodoAxios = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleClick = () => {
    const body = {
      id: 1,
      userId: 1,
      title: title,
      completed: completed,
    };

    // যেই data টা সার্ভারে POST/PUT করব, সেইটা একটা varibale এ save করে, then axios এ parameter হিসেবে pass করব
    // promise এর information retrive করতে হলে, then দিয়ে এইভাবে করতে হয় 
    axios
      .put("https://jsonplaceholder.typicode.com/posts/1", body)

      //axios automatically converts data to JSON, so we don't need convert JSON line here fetchAPI

      //axios তার 'response.data' এর মধ্যে তার information টা থাকে
      .then((response) => console.log(response.data))

      //কি error হইতাছে, সেইটা দেখতে 'error.message' check করব browser console এ
      .catch((error) => console.log({ error: error}));  
  };

  return (
    <div>
      <label>title:</label>
      <input type="text" onChange={(event) => setTitle(event.target.value)} />
      <br />
      <label>completed:</label>
      <input type="checkbox" onChange={() => setCompleted(!completed)} />
      <br />
      <button onClick={handleClick}>Update Data</button>
    </div>
  );
};

//insted of 'fetch' we will use 'axios' library which presents simplify. 'axios' হলে, code read ability increase করে। চোখের শান্তি।
//'fetch' by default error throw করে না, 'axios' error throw করে

//A Promise is an object that represents an asynchronous operatio.
// promise browser handle করে 
// axios or fetch both behaves like promise. কোন কাজ করতে সময় লাগলে সেইটা OS(operating system) কে দিয়ে দেয়, নিজেরা অন্য কাজ handle করতে থাকে
// fetch -----> OS -----> i'm done 


// JavaScript single thread, node.js দিয়ে multiple core use করা যায়