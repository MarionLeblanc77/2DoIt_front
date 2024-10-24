import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Nav from "./Nav/Nav";
import Home from "./Home/Home";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
