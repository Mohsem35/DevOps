import React, { useState } from "react";

function App() {
  //let counter = 0;
  //[value, setterFunction]

  //মুখস্থ ফরম্যাট
  //React এ initially কোন value দিতেই হবে useState() এ
  const [counter, setCounter] = React.useState(0);
  const [currentText, setCurrentText] = useState("");

  const handleClick = () => {
    //handleClick() itself is a function
    // counter += 1;
    setCounter(counter + 1); //value changes with UI
    // console.log("counter value", counter);
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value); // মুখস্থ ফরম্যাট
  };

  return (
    <div>
      <p>{counter}</p>
      <button onClick={handleClick}>Add one</button>
      <br />
      <br />
      <br />
      <input type="text" onChange={handleChange} />
      <p>{currentText}</p>
    </div>
  );
}

export default App;

//onCick = is an event. have to understand react, that I am clicking on button
//JavaScript codes must be enclosed with curly braces. {}
//{handleClick} is a reference

//as a DevOps engineer, we have to work with npm future
//useState() returns array[] and initail_value = 0. this array will have 2 elements. Destructuring.

//const[value, setFunction] = React.useState(initial_value)
//using setCounter(counter+1), instead of (counter+1)
// সরাসরি increment না করে, setter function () use করব, যার argument হল counter+1
// const [counter, setCounter], এখানে const use করার পরেও কোন error হচ্ছে না, cause value update হচ্ছে setter(counter+1) function এর দিয়ে পরবর্তীতে
