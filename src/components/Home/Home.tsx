import DOMPurify from "dompurify";
import { useState, FormEvent } from "react";
import { useAppDispatch } from "../../store/hooks-redux";
import "./Home.scss";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { actionChangeUserStateInfo } from "../../store/reducers/userReducer";
import login from "../../store/middlewares/login";

function Home() {
  const dispatch = useAppDispatch();

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

  const loginContent = <Login changeField={changeUserField} />;
  const registerContent = <Register changeField={changeUserField} />;

  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
  };

  const handleSubmitRegister = () => {
    dispatch(register());
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
    },
    {
      id: 2,
      title: "Register",
      content: {
        fields: registerContent,
        buttonLabel: "Register",
      },
      action: handleSubmitRegister,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="home">
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab.id}
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
              key={tab.id}
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
                <button className="tab-panel-button" type="submit">
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
