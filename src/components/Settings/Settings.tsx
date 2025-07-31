// import DOMPurify from "dompurify";
// import { useState, FormEvent } from "react";
// import { useAppDispatch } from "../../store/hooks-redux";
import "./Settings.scss";
// import { actionChangeUserStateInfo } from "../../store/reducers/userReducer";

function Settings() {
  // const dispatch = useAppDispatch();

  // const changeUserField = (
  //   value: string,
  //   name: "firstName" | "lastName" | "email" | "password"
  // ) => {
  //   dispatch(
  //     actionChangeUserStateInfo({
  //       fieldName: name,
  //       newValue: DOMPurify.sanitize(value),
  //     })
  //   );
  // };

  return (
    <div className="settings">
      <h1>SETTINGS</h1>
      <section className="settings-contacts">
        <h2>My contacts</h2>
      </section>
      <section className="settings-informations">
        <h2>My information</h2>
      </section>
    </div>
  );
}

export default Settings;
