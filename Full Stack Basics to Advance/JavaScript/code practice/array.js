//Technically an array is an object


let numbers = new Array('sqish', 5,6,3.8, true);            //array object
console.log(numbers);


fruits = ['mango', 'banana', 'watermelon', 'papaya'];       //adding elemnt to array with index
fruits[4] = 'guava';
console.log(fruits);



console.log(fruits.length);             //array length


fruits.push(3.1416);                    //add elemnt at end of an array
fruits.pop();                           // Remove an element 

fruits.unshift('strawberry');           //add elements at the beginning


console.log(Array.isArray(fruits));     //if something is present in array


console.log(fruits.indexOf('mango'));   //find out index

