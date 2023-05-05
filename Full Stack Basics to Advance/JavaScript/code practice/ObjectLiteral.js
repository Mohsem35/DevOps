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

//bracket notation
console.log(person.hobbies[2]);

//dot notation
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

console.log("daily tasks of mine: "+todos[1].text);