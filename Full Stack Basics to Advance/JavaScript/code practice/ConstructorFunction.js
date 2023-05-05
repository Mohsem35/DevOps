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