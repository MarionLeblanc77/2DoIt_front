import { useAppSelector } from "../../store/hooks-redux";
import List from "../List/List";
import "./Home.scss";
import Login from "./Login/Login";

function Home() {
  const logged = useAppSelector((state) => state.userReducer.logged);
  return <div className="home">{logged ? <List /> : <Login />}</div>;
}

export default Home;
