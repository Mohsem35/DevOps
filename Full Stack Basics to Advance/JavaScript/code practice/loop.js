//Example 1
const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
} 
console.log(ages); // (4) [46, 30, 68, 17]



//Example 2
const milkas = [
    "Milkas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ["Michael", "Peter", "Steven"],
    true,
  ];
  
  //declare empty array
  const types = [];
  
  for (let i = 0; i < jonas.length; i++) {
    console.log(jonas[i], typeof jonas[i]);
  
    // Jonas string
    // Schmedtmann string
    // 46 number
    // teacher string
    // (3) ["Michael", "Peter", "Steven"] object
    // true boolean
 
    // types[i] = typeof jonas[i];
  
    types.push(typeof jonas[i]);
  } 
  console.log(types); // (6) ["string", "string", "number", "string", "object", "boolean"]




// Example 3
//decremental array
  const jonas = [
    "Jonas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ["Michael", "Peter", "Steven"],
  ];
  
  for (let i = jonas.length - 1; i >= 0; i--) {
    console.log(i, jonas[i]);
  }
  
  // 4 (5) ["Michael", "Peter", "Steven"]
  // 3 teacher 
  // 2 46 
  // 1 Schmedtmann 
  // 0 Jonas


  //Example 4
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


  for (let i = 0; i<= todos.length; i++){
    console.log(todos[i]);
}

// alternative approach
for (let todo of todos){
    console.log(todo);
}