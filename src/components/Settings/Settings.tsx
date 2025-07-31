// import DOMPurify from "dompurify";
// import { useState, FormEvent } from "react";
// import { useAppDispatch } from "../../store/hooks-redux";
import { useAppSelector } from "../../store/hooks-redux";
import "./Settings.scss";
// import { actionChangeUserStateInfo } from "../../store/reducers/userReducer";

function Settings() {
  // const dispatch = useAppDispatch();

  const userContacts = useAppSelector(
    (state) => state.userReducer.connectedUser.contacts
  );

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

  console.log(userContacts);
  return (
    <div className="settings">
      <h1 className="settings-title">SETTINGS</h1>
      <section className="settings-container settings-contacts">
        <h2>My contacts</h2>
        <ul>
          {userContacts.map((contact) => (
            <li key={contact.id}>
              {contact.firstName} {contact.lastName}
            </li>
          ))}
        </ul>
      </section>
      <section className="settings-container settings-informations">
        <h2>My information</h2>
      </section>
    </div>
  );
}

export default Settings;
