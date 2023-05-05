let person = {                              //{} is called ‘object literal’.
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


console.log(person.hobbies[2]);                  //bracket notation


console.log(person.address.country);            //dot notation


person.email = 'maly.mohsem@cellosco.pe';      //add new property in object
console.log(person);



let todos = [                                   //array of objects
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



let todoJSON = JSON.stringify(todos);               //convert to JSON
console.log(todoJSON);

console.log("daily tasks of mine: "+todos[1].text);