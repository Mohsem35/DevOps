import { useEffect, useState } from "react";

//useState() is a hook. তে argument পাস করতেই হবে, খালি রাখা যায় না

function App() {
  const [data, setData] = useState(null);

  // মুখস্থ ফরম্যাট
  //আমি React দিয়ে অর্থাৎ website/application থকে data fetch করব
  // fetch promise রিটার্ন করতেছে
  //(1)URL থেকে data fetch করল (2)then data কে JSON convert করল (3) JSON কে value তে save করল (4) them value কে setter() ফাংশনে পাস করল
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=2")
      .then((response) => response.json())
      .then((value) => setData(value)); //setter function কল হইছে এখানে, এখন UI তে value show করবে
  }, []);

  // JSON data কে formatting করতে চাচ্ছি
  // data && - মানে data exist করে এবং
  //data.map - array higher order function. item = variable_name.
  //key হবে unique data
  //একটা funtion থেকে একটা return ই possible. তাই, we return 'name' and 'id' কে <div> section এ রেখে একটা জিনিষ ই রিটার্ন করতেছি. without <div> error দেখাবে
  //তাই বারবার সবকিছু একটা <div> এ রাখতেছি
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <h3>name: {item.title}</h3>
              <p>id: {item.id}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;

// মুখস্থ ফরম্যাট
//JSON.stringify(data, null,2)      //JSON কে string convert করা হইছে, argument হিসেবে data variable pass হইছে
//Take a look at JSONPlaceholder website

//useEffect() is a React hook
//আগের function এ যেইটা return হয়, পরের function এ সেইটা argument হিসাবে আসে
//query params '?_limit=5' । মানে তুমি আমাকে ৫ টা todo দাও. 'array of objects' হিসেবে ৫ টা দেখাবে
