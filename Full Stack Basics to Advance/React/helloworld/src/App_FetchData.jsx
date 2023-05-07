import React from "react";

//useState() is a hook. তে argument পাস করতেই হবে, খালি রাখা যায় না

function App() {
  const [data, setData] = useState(null);

  // মুখস্থ ফরম্যাট
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json()) // response টাকে JSON বানাও
      .then((value) => setData(value));
  }, []);

  return (
    <div>
      { <pre>{JSON.stringify(data, null, 2)}</pre> }
      {data &&
        data.map((item) => {
          return (
            <div key={item}> 
              <h3>name: {item.title}</h3>
              <p>completed: {item.completed}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;

//JSON.stringify(data, null,2)      // মুখস্থ ফরম্যাট //JSON কে string convert করা হইছে
//JSONPlaceholder

//আমি React দিয়ে অর্থাৎ website থকে data fetch করব
//useEffect() is a React hook
//আগের function এ যেইটা return হয়, পরের function এ সেইটা argument হিসাবে আসে
//query params ?_limit=5
