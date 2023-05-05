//Fucntion
function addNum(a, b){
    return a + b;
}
console.log(addNum(5,8));

//Alternative Way
const addNum1 = function (a, b) {
    return a + b;
}

//Arrow Function
const addNum2 = (a, b) => {
    return a+b;
}


//what is callback function?
// A callback function is a function that is passed as an argument to another function and is executed after some specific task is completed. 
// The primary purpose of using a callback function is to allow asynchronous or non-blocking operations to be performed in a program.

// When a function takes a callback function as an argument, it can execute the callback function at any time, 
// including after the main function has returned. This allows the program to perform other tasks while the main function is still running, 
// and the callback function can be executed when the task it is waiting for is completed.

//Callback Function
//Ex 1
// const apple = () => {
//     console.log("apple");
// }

// const orange = () => {
//     console.log("orange");
// }

// const fruits = () => {                      // fruits function
//     apple();                        //calling apple() function
//     orange();                       //calling orange() function
// }

// console.log(fruits());



// Ex 2
const apple1 = () => {
    console.log("apple");
}

const orange1 = () => {
    console.log("orange");
}

const banana = () => console.log("banana");     // banana function

const fruits1 = (newFruitFn) => {              // newFruitFn is a parameter of fruits1() function
    apple1();                        
    orange1();   
    newFruitFn();                    
}

console.log(fruits1(banana));               // banana == newFruitFn