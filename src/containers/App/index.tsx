import { useState } from "react";
import Container1 from "../Container1";
import Container2 from "../Container2";

function App() {
  const [container1Active, setContainer1Active] = useState(false);
  const [container2Active, setContainer2Active] = useState(false);
  return (
    <div>
      <button onClick={() => setContainer1Active((v) => !v)}>
        Toggle container 1
      </button>
      {container1Active && <Container1 />}
      <button onClick={() => setContainer2Active((v) => !v)}>
        Toggle container 2
      </button>
      {container2Active && <Container2 />}
    </div>
  );
}

export default App;
