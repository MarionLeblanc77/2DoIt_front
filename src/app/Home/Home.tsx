import DOMPurify from "dompurify";
import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import "./Home.scss";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import {
  actionChangeUserStateInfo,
  actionEmptyMessages,
} from "../../store/reducers/userReducer";
import login from "../../store/middlewares/login";
import register from "../../store/middlewares/register";

function Home() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.userReducer.messages);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const changeUserField = (
    value: string,
    name: "firstName" | "lastName" | "email" | "password"
  ) => {
    dispatch(
      actionChangeUserStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  const loginContent = (
    <Login
      changeField={changeUserField}
      isRememberMe={isRememberMe}
      setIsRememberMe={setIsRememberMe}
    />
  );
  const registerContent = (
    <Register
      changeField={changeUserField}
      isRememberMe={isRememberMe}
      setIsRememberMe={setIsRememberMe}
    />
  );

  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(isRememberMe));
  };

  const handleSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(isRememberMe));
  };

  const tabs = [
    {
      id: 1,
      title: "Login",
      content: {
        fields: loginContent,
        buttonLabel: "Connection",
      },
      action: handleSubmitLogin,
      rememberMe: { setIsRememberMe, isRememberMe },
    },
    {
      id: 2,
      title: "Register",
      content: {
        fields: registerContent,
        buttonLabel: "Register",
      },
      action: handleSubmitRegister,
      rememberMe: { setIsRememberMe, isRememberMe },
    },
  ];
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    dispatch(actionEmptyMessages());
    setActiveTab(tabId);
  };

  return (
    <div className="home">
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab) => (
            <button
              key={`tab-header-${tab.id}`}
              role="tab"
              type="button"
              tabIndex={0}
              aria-controls={`tabpanel-${tab.id}`}
              className={`tab-header ${activeTab !== tab.id ? "inactive" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tabs-content">
          {tabs.map((tab) => (
            <div
              key={`tab-content-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className={`tab-panel ${activeTab === tab.id ? "active" : ""}`}
            >
              <form onSubmit={tab.action}>
                <p className="tab-panel-mandatory-fields">
                  Mandatory fields are followed by a
                  <span aria-label="required"> *</span>
                </p>
                {tab.content.fields}
                {messages.length > 0 && (
                  <ul className="tab-panel-messages">
                    {messages.map((msg) => (
                      <li
                        className="tab-panel-message"
                        aria-live="assertive"
                        key={msg}
                      >
                        {msg}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  className="tab-panel-button button-volume"
                  type="submit"
                >
                  {tab.content.buttonLabel}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
