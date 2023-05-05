const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    birthYear: 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
    hasDriversLicense: true,
  
    // calcAge: function (birthYear) {
    //   return 2037 - birthYear;
    // },
  
    // calcAge: function () {
    //   // console.log(this);
    //   return 2037 - this.birthYear;
    // },
  
    calcAge: function () {                          //declare function in object
      this.age = 2037 - this.birthYear;
      return this.age;
    },
  
    getSummary: function () {
      return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
    },
  };

console.log(jonas);

console.log(jonas.calcAge()); // 46
console.log(jonas.age); // 46
console.log(jonas.getSummary()); // Jonas is a 46-year old teacher, and he has a driver's license.