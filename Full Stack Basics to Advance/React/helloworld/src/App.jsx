// https://jsonplaceholder.typicode.com/guide/

import { useEffect, useState } from "react";
import { CreateTodo } from "./CreateTodo_POST";
import { CreateTodoPUT } from "./CreateTodo_PUT";
import { CreateTodoAxios } from "./CreateTodo_Axios";


function App() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=2")
  //     .then((response) => response.json())
  //     .then((value) => setData(value));
  // }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <CreateTodo /> */}
      {/* <CreateTodoPUT /> */}
      <CreateTodoAxios />
    </div>
  );
}

export default App;
