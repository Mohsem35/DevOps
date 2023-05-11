import { useState } from "react";

//component declare করার new way
export const CreateTodo = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  //boolean এর জন্য 'useState()' এ by default false value ব্যবহার করব
  const [completed, setCompleted] = useState(false);


  const handleClick = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: title,
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log({ error: error }));
  };

  ////মুখস্থ ফরম্যাট
  //setter function used here 'setUserId'
  //function handleChange() declare না করে, return এর ভিতরে anonymous function use করছি

  // const handleChange = (event) => {
  //   setUserId(event.target.value);
  // };

  return (
    <div>
      <label>userId:</label>
      <input
        type="number"
        onChange={(event) => setUserId(Number(event.target.value))}
      />
      <br />
      <label>title:</label>
      <input type="text" onChange={(event) => setTitle(event.target.value)} />
      <br />
      <label>completed:</label>
      <input type="checkbox" onChange={() => setCompleted(!completed)} />
      <br />
      <button onClick={handleClick}>Post Data</button>
    </div>
  );
};

//anonymous function =  handleChange() fucntion যা কিছু করছি, এই কাজ টা যদি সরাসরি return এর ভিতরে লিখে দিতাম, তাইলে ও code কাজ করত এবং তা-ই করা হইছে
//onChange={() => setCompleted(!completed)}; যেহেতু আমরা initial value false দিছিলাম, তাহলে onChange এ মানে clice করলে তার উলটা টা হইব. আর না করলে false ই থাকব। event no need here

//id = 101. একটা id ঘুরেফিরে change করতে দিতাছে JSONPlaceHoler


  // এই url এ post request টা করতে হবে
   //value গুলো আসতেছে উপরের state থেকে 