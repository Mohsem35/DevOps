import { useState } from "react";

export const CreateTodoPUT = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleClick = () => {
    //I am changing id of 1 and declaring that in URL
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
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


 