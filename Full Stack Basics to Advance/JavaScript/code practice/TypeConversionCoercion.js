// Type Conversion

const inputYear = "1998";
console.log(Number(inputYear), inputYear); // 1998 '1998'
console.log(Number(inputYear) + 18); // 2016

console.log(Number("John")); // NaN
console.log(typeof NaN); // number

console.log(String(23), 23); // '23' 23

// Type Coercion

console.log("I am " + 23 + " years old"); // I am 23 years old
console.log("23" - "10" - 3); // 10
console.log("23" + "10" + 3); // 23103
console.log("23" * "2"); // 46
console.log("23" / "2"); // 11.5
console.log("23" > "18"); // true