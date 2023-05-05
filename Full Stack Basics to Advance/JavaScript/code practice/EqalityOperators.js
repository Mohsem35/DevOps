const age = "18";

if (age === 18) console.log("You just became an adult! (strict)"); // undefined
if (age == 18) console.log("You just became an adult! (loose)"); // You just became an adult! (loose)

const favourite = Number(prompt("What's your favourite number?"));

console.log(favourite); // 23
console.log(typeof favourite); // number

if (favourite === 23) {
  console.log("Cool! 23 is an amazing number!"); // Cool! 23 is an amazing number!
} else if (favourite === 7) {
  console.log("7 is also a cool number"); // 7 is also a cool number
} else {
  console.log("Number is not 23 or 7"); // Number is not 23 or 7
}

if (favourite !== 23) console.log("Why not 23?"); // undefined