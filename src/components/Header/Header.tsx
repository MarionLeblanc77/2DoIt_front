import { useLocation, useNavigate } from "react-router-dom";
import { Home, Power, Settings } from "react-feather";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import { actionLogout } from "../../store/reducers/userReducer";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const connectedUser = useAppSelector(
    (state) => state.userReducer.connectedUser
  );

  const handleClickParams = () => {
    navigate("/settings");
  };
  const handleClickLogout = () => {
    dispatch(actionLogout());
    navigate("/");
  };
  const handleClickDashboard = () => {
    navigate("/");
  };

  const isSettingsPage = location.pathname === "/settings";

  return (
    <div className="header">
      {isSettingsPage ? (
        <div className="header-dashboard">
          <button
            type="button"
            className="header-dashboard-button button-volume"
            onClick={handleClickDashboard}
          >
            <Home className="header-dashboard-button-icon" size="18px" />
            <p>Back to Dashboard</p>
          </button>
        </div>
      ) : (
        <div className="header-account">
          <button
            type="button"
            className="header-account-button button"
            onClick={handleClickParams}
          >
            <Settings className="header-account-icon" size="18px" />{" "}
          </button>

          <p className="header-account-text">
            {`${connectedUser.firstName} ${connectedUser.lastName}`}
          </p>
        </div>
      )}
      <div className="header-logout">
        <button
          type="button"
          className="header-logout-button button-volume"
          onClick={handleClickLogout}
        >
          <Power className="header-logout-button-icon" size="18px" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}
