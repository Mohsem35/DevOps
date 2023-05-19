

**_Q: What is a bundler?_**

A bundler is a tool that `takes multiple JavaScript or CSS files and combines them into a single file (or multiple files) for optimized delivery to the browser.` The primary purpose of a bundler is to improve performance by reducing the number of HTTP requests needed to fetch individual files.

**_Q: What is npm(node package manager)?_**

npm (Node Package Manager) is a package manager for JavaScript and the default package manager for the Node.js runtime environment. It `allows developers to easily manage and install various libraries, frameworks, and tools for their JavaScript projects.` NPM is bundled with Node.js, so when you install Node.js, NPM is automatically installed as well.
- NPM can automatically install the dependencies listed in the _**package.json**_ file

![How-To-Use-Node js-Modules-with-npm-and-package json-](https://github.com/Mohsem35/DevOps/assets/58659448/e98372f8-5bb7-4133-8a66-ce742576528b)


## React

`React is a library` but 'Angular' is a framework. Angular এর ভিতরে React use করতে পারবেন 


React reading resource: [React Offical Documentation](https://react.dev/learn)

```
import React from "react"   //must line
```

`Vite` is a bundler. We will start React through vite through [Getting Started](https://vitejs.dev/guide/)

![logo](https://github.com/Mohsem35/DevOps/assets/58659448/e54d6164-9225-402b-9f31-2489d3ad7d26)



#### React project initiate through vite: 
```
npm create vite@latest
cd <project_directory>
npm install
npm run dev 
```

**_Q: how can npm undersatnd which libraries I need?_**

- By executing `npm install`, it will install all dependecy libraries for running the project and will create a folder named **_'node_modules'_** where all the packages reside.
it will actually check the {dependencies} section of 'package.json' file and install libraries according to the file.




#### JSX 

JSX (JavaScript XML) is an extension to the JavaScript language syntax that allows developers to `write HTML-like code within JavaScript. JSX is commonly used with React,` a popular JavaScript library for building user interfaces.

`JSX = JavaScript + HTML`

![jsx-tutorial-0](https://github.com/Mohsem35/DevOps/assets/58659448/a5e3aa16-24dd-442a-ad0c-27fa4e24d83d)

#### App.jsx

The App.jsx component serves as the `entry point for the React application` and typically `represents the top-level component that encapsulates the entire application's functionality and UI structure.`

```
import React from 'react';

function App() {
  return (
    <div>
      <h1>Welcome to My React App</h1>
      {/* Other components and UI elements */}
    </div>
  );
}
export default App;
```

In App.jsx file there should be must 3 items:
- contains `function App()`
- retrun `JSX`
- `export default App`


#### Building blocks of react:

**_1. Component:_** loosely coupled units

- components are the `building blocks` of any React application, and a single app usually consists of multiple components
- a component is essentially a piece of the UI. It is like a `function that returns HTML elements`
- react components remain `discrete and are processed independently.`
- components can be resued multiple times across the application.
- Root component(**function App()**) `contains multiple components.`

Form JSX to convert vanila JS, we need 'webpack' library 

We will declare components in seperate files for better understanding and have to `export` 

```
//ContactMe.jsx
export function ContactMe(){}
```
and in App.jsx, you have to `import` that file

```
//App.jsx
import {ContactMe} from "./ContactMe";

function App() {
    app component
        contains all components
        return jsx
}
```

**_2.State:_** মুহূর্ত। আগে ছিল 0 এখন value 1

- `dynamic storage/database`
- state of a component is `an object that holds some data.`
- this data influences the output of a component
- `every time the state of an object changes, the component is re-rendered onto the screen`


```
const [counter, setCounter] = useState(0)

setCounter(counter+1);
onClick={HandleClick}

const [currentText, setCurrentText] = useState("")
function HandleChange(event) {
    setCurrentText(event.target.value)              // মুখস্ত
}                                                   // text type করার সাথে সাথে UI change হবে
onChange={HandleChange} 
```

`counter`= variable

`setCounter` = setter function()

`useState(0)` = passes initial value, means value zero



**_3. Data Fetching:_**  `useState()`, `useEffect()` are a Hooks in React

In React, hooks are `functions` that allow you to `use state and other React features in functional components.`
<p>Hooks provide a more straightforward and flexible approach to managing state and side effects in functional components, reducing the need for class components and improving code organization and reusability.</p>


The **JSON.stringify()** function is a built-in JavaScript function that converts a `JavaScript object or value to a JSON string`

```
INPUT:
const data = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const jsonString = JSON.stringify(data, null, 2);
console.log(jsonString);
```

```
OUTPUT:
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```


const jsonString = JSON.stringify(data, null, 2);
console.log(jsonString);


HTTP request: GET, POST, DELETE, PUT

```
JSON.stringfy(data, null, 2)      // data=, null = মুখস্ত, 2 = spacing big or small
//মুখস্ত
useEffect(()=>{
    fetch("url").then((responses) => responses.JSON()).       // আগের function যেইটা return হয়, পরের function এ সেইটা argument হিসাবে pass হয়
                .then((data) => console.log(data));
},[]);
```

> **_NOTE:_**: পুরা function থেকে কেবল একটা return possible, তাই বারবার `<div>` tag করব



#### DOM 

**_Q. What is DOM(document object model)?_**

It represents `the structure and content of a web page as a tree-like data structure` where each node corresponds to an element, attribute, or text in the document.

#### Virtual DOM

**_Q. What is virtual DOM?_**

React `keeps a lightweight representation of the Real DOM in the memory,` and that is knows as **Virtual DOM**.
`Manipulating Real DOM is much slower` than manipulating virtual DOM, because nothing gets drawn onscreen
`When the state of an object changes, Virtual DOM changes only that object in the real DOM instead of updating all the objects.`

- One-way data binding means information flows in only one way data direction

- `components of react are fucntional in nature` that is they **receive information through arguments and pass information via there return values.**
- React provides server-side rendering means the application is rendered on the server rather than in browser.
- `render()` method is responsible for how the UI looks and feels to the user


- React extension - Flux

`Flux:` is application architecture that facebook uses.

#### Props
props is short for properties, that allow us to pass arguments or data to components

