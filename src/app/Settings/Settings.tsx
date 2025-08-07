import { FormEvent, useState } from "react";
import DOMPurify from "dompurify";
import { Trash2 } from "react-feather";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import "./Settings.scss";
import Field from "../../components/Field/Field";
import addContact from "../../store/middlewares/addContact";

import deleteContact from "../../store/middlewares/deleteContact";

function Settings() {
  const dispatch = useAppDispatch();
  const [contactEmail, setContactEmail] = useState<string>("");
  const [addContactErrorMsg, setAddContactErrorMsg] = useState<string>("");

  const userContacts = useAppSelector(
    (state) => state.userReducer.connectedUser.contacts
  );
  const handleSubmitNewContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactEmail) {
      dispatch(addContact({ contactEmail }));
      setAddContactErrorMsg("");
      setContactEmail("");
    } else {
      setAddContactErrorMsg("Please enter an email address.");
    }
  };

  return (
    <div className="settings">
      <h1 className="settings-title">SETTINGS</h1>
      <section className="settings-container settings-contacts">
        <h2>My contacts</h2>
        <form
          className="settings-contacts-form"
          onSubmit={handleSubmitNewContact}
        >
          <div className="settings-contacts-form-base">
            <Field
              type="email"
              placeholder="Enter your contact's email"
              onChange={(value) => setContactEmail(DOMPurify.sanitize(value))}
              value={contactEmail}
              required={false}
            />
            <button
              className="settings-contacts-new-button button-volume"
              type="submit"
            >
              Add a new contact
            </button>
          </div>
          <p className="settings-contacts-form-error"> {addContactErrorMsg}</p>
        </form>

        <ul className="settings-contacts-list">
          {userContacts?.map((contact) => (
            <li
              key={contact.id}
              className="settings-contacts-item editable-element"
            >
              <p className="settings-contacts-item-name">
                {contact.firstName} {contact.lastName}
              </p>
              <Trash2
                className="delete-icon"
                size="1.2rem"
                onClick={() => dispatch(deleteContact({ id: contact.id }))}
              />
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
