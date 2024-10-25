import { Power } from "react-feather";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import {
  actionChangeUserStateInfo,
  actionLogout,
} from "../../store/reducers/userReducer";
import List from "../List/List";
import "./Home.scss";
import Login from "./Login/Login";

function Home() {
  const logged = useAppSelector((state) => state.userReducer.logged);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUserField = (
    value: string,
    name: "lastName" | "firstName" | "email" | "password"
  ) => {
    dispatch(
      actionChangeUserStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  const handleClickLogout = () => {
    dispatch(actionLogout());
    navigate("/");
  };

  return (
    <div className="home">
      {logged ? (
        <div>
          <List />{" "}
          <button type="button" className="logout" onClick={handleClickLogout}>
            <Power className="logout--icon" />
            <p>Se déconnecter</p>
          </button>
        </div>
      ) : (
        <Login changeField={changeUserField} />
      )}
    </div>
  );
}

export default Home;
