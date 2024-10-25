import DOMPurify from "dompurify";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import { actionChangeUserStateInfo } from "../../store/reducers/userReducer";
import List from "../List/List";
import "./Home.scss";
import Login from "./Login/Login";

function Home() {
  const logged = useAppSelector((state) => state.userReducer.logged);

  const dispatch = useAppDispatch();

  const changeUserField = (
    value: string,
    name: "last_name" | "first_name" | "email" | "password"
  ) => {
    dispatch(
      actionChangeUserStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  return (
    <div className="home">
      {logged ? <List /> : <Login changeField={changeUserField} />}
    </div>
  );
}

export default Home;
