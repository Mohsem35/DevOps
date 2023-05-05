const firstName = "John";
const job = "teacher";
const birthYear = 1998;
const year = 2021;


//important line
const johnNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;

console.log(johnNew); // I'm John, a 23 years old teacher!

//break lines
console.log(
  "String with \n\
multiple \n\
lines"
); // String with
// multiple
// lines