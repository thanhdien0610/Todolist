import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todolist from "./components/Todolist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Todolist />
    </div>
  );
}

export default App;
