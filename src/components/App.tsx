import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Nav from "./Nav/Nav";
import List from "./List/List";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
