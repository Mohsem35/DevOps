import { ContactMe, Random } from "./ContactMe";
import { AboutMe } from "./AboutMe";

//similar logics are seperated, that's called component. Here child components are - AboutMe(), ContactMe() etc.

function App() {                //parent component
  return (
    <div>
      <Random />
      <AboutMe />               
      <ContactMe />
    </div>
  );
}

export default App;       //default export can be 'only one'
