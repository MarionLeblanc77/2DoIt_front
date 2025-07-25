import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/hooks-redux";
import "./App.scss";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const logged = useAppSelector((state) => state.userReducer.logged);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={logged ? <Dashboard /> : <Home />} />
        {/* <Route path="/*" element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
