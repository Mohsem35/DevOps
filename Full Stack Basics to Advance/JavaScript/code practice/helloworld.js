console.log("Hello World");

//ternary operator
let age = 23;

let result = (age >= 18) ? "adult" : "not eligible";
console.log(result);


//string operation
let s = 'moyul is good';
console.log(s.length);
console.log(s.toUpperCase());
console.log(s.toLowerCase());

//substring 
console.log(s.substring(0,8));

//split a string
let p = "technology, computer, pepsi, johad";
console.log(p.split(","));

//Array object
let numbers = new Array('sqish', 5,6,3.8, true);
console.log(numbers);

//adding elemnt to array with index
fruits = ['mango', 'banana', 'watermelon', 'papaya'];
console.log(fruits.length);
fruits[4] = 'guava';
console.log(fruits);

//add elemnt at end of an array
fruits.push(3.1416);
console.log(fruits);

//add elements at the beginning
fruits.unshift('strawberry');
console.log(fruits);

//if something is present in array
console.log(Array.isArray(fruits));

//find out index
console.log(fruits.indexOf('mango'));


//object literal
let person = {
    firstName: 'maly',
    lastName: 'ahmed',
    age: 26,
    position: 'DBA',
    hobbies: ['devops', 'music', 'travel'],
    address: {
        street: 'gaznabi road',
        city: 'dhaka',
        country: 'bangladesh'
    }
}

console.log(person.hobbies[2]);
console.log(person.address.country);

//add new property in object
person.email = 'maly.mohsem@cellosco.pe';
console.log(person);


//array of objects
let todos = [
    {
        id: 1,
        text: 'complete JS crash course',
        isCompleted: true
    },
    {
        id: 2,
        text: 'taking salat on time',
        isCompleted: true
    },
    {
        id: 3,
        text: 'family dinner',
        isCompleted: true
    }
];

//convert to JSON
let todoJSON = JSON.stringify(todos);
console.log(todoJSON);


// console.log(todos);
console.log("daily tasks of mine: "+todos[1].text);

//for loop
for (let i = 0; i<= todos.length; i++){
    console.log(todos[i]);
}

// alternative approach
for (let todo of todos){
    console.log(todo);
}


// high order array methods
//forEach, map, filterar

//fucntion
function addNum(a, b){
    return a+b;
}
console.log(addNum(5,8));

const addNum = (a, b) => {
    return a+b;
}
console.log(addNum(5,8));

//constructor function
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);

}

//instantiate a object
//const newArray = new Array();
const p1 = new Person('Maly','Ahmed', '10-4-1995');
console.log(p1);
console.log(p1.dob.getFullYear());
