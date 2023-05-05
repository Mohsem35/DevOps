//array object
let numbers = new Array('sqish', 5,6,3.8, true);
console.log(numbers);

//adding elemnt to array with index
fruits = ['mango', 'banana', 'watermelon', 'papaya'];
fruits[4] = 'guava';
console.log(fruits);


//array length
console.log(fruits.length);

//add elemnt at end of an array
fruits.push(3.1416);

//add elements at the beginning
fruits.unshift('strawberry');

//if something is present in array
console.log(Array.isArray(fruits));

//find out index
console.log(fruits.indexOf('mango'));