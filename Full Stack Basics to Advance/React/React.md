React reading resource - React Offical Documentation https://react.dev/learn


Vite is a bundler. We will start React through 'Vite'
Getting Started: https://vitejs.dev/guide/

react project initiate: npm create vite@latest
cd <project_directory>
npm install
npm run dev 
 
Q: what us npm(node package manager)?
- manage node   

Q: how can npm undersatnd which libraries I need?
- by executing "npm install" it will install all dependecy libraries for running the project and will create a folder named 'node_modules'.
it will actually check the {dependencies} section of 'package.json' file and install libraries according to the file


JSX is a syntax extension to JavaScript. It is used with React to describe what the user interface should look like.
By using JSX, you can write HTML structures in the same file that contains JavaScript code
JSX = JavaScript + HTML

App.jsx = root component file
1. it must contain function App()
2. retrun JSX
3. export default App


Building blocks of react:

1. Component: loosely coupled units

- components are the building blocks of any React application, and a single app usually consists of multiple components
- a component is essentially a piece of the UI. It is like a function that returns HTML elements
- react components remain discrete and are processed independently.
- components can be resued multiple times across the application.

Form JSX to convert vanila JS, we need 'webpack' library 

Root component(function App()) contains multiple components.
We can declare other components in seperate files but have to declare 'export'

//ContactMe.jsx
export function ContactMe(){}

and in App.jsx, you have to import that file
//App.jsx
import {ContactMe} from "./ContactMe";

function App() {
    app component
        contains all components
        return jsx
}


2.State: মুহূর্ত। আগে ছিল 0 এখন value 1

- dynamic storage/database
- state of a component is an object that holds some data.
- this data influences the output of a component
- every time the state of an object changes, the component is re-rendered onto the screen

import React from "react"   //must line


const [counter, setCounter] = useState(0)

counter = variable
setCounter = setter function
useState(0) passes initial value, means counter = 0

setCounter(counter+1);
onClick={HandleClick}

const [currentText, setCurrentText] = useState("")
function HandleChange(event) {
    setCurrentText(event.target.value)              // মুখস্ত
}
onChange={HandleChange} 

3. Data Fetching: useState is a Hook in React

JSON.stringfy(data, null, 2)

data=
null = মুখস্ত
2 = spacing big or small

HTTP request: GET, POST

//মুখস্ত
useEffect(()=>{
    fetch("url").then((responses) => responses.JSON()).
                .then((data) => console.log(data));
},[]);

আগের function যেইটা return হয়, পরের function এ সেইটা argument হিসাবে pass হয়

পুরা function থেকে কেবল একটা return possible, তাই বারবার <div> tag করব


DOM treats an XML or HTML document as a tree structure in which each node is an object representing a part of the document.

React creats Virtual DOM
Virtual DOM - React keeps a lightweight representation of the Real DOM in the memory, and that is knows as Virtual DOM
Manipulating Real DOM is much slower than manipulating virtual DOM, because nothing gets drawn onscreen
When the state of an object changes, Virtual DOM changes only that object in the real DOM instead of updating all the objects.

One-way data binding means information flows in only one way data direction

components of react are fucntional in nature that is they receive information through arguments and pass information via there return values.

React provides server-side rendering means the application is rendered on the server rather than in browser.

React extension - Flux
Flux: is application architecture that facebook uses.



3.Props:
- props is short for properties, that allow us to pass arguments or data to components

render() method is responsible for how the UI looks and feels to the user
