/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks-redux";
import "./App.scss";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import Header from "../components/Header/Header";
import getUserSections from "../store/middlewares/getUserSections";
import getUserContacts from "../store/middlewares/getUserContacts";
import Error from "./Error/Error";

function App() {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.userReducer.logged);

  useEffect(() => {
    if (logged) {
      dispatch(getUserSections());
      dispatch(getUserContacts());
    }
  }, [logged]);

  return (
    <div className="app">
      {logged ? <Header /> : null}
      <Routes>
        {!logged && <Route path="/*" element={<Home />} />}
        {logged && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/*" element={<Error />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
