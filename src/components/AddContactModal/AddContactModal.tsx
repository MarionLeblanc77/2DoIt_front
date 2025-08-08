import { useAppSelector } from "../../store/hooks-redux";
import "./AddContactModal.scss";

interface AddContactModalProps {
  position: DOMRect;
}

export default function AddContactModal({ position }: AddContactModalProps) {
  const contacts = useAppSelector(
    (state) => state.userReducer.connectedUser.contacts
  );

  return (
    <ul
      className="add-contact-modal"
      style={{ left: position.right, top: position.top }}
    >
      <div className="add-contact-modal-container">
        {contacts ? (
          contacts.map((contact) => (
            <li key={contact.id} className="add-contact-modal-item">
              <p className="add-contact-modal-item-name">{`+ ${contact.firstName} ${contact.lastName}`}</p>
            </li>
          ))
        ) : (
          <li className="add-contact-modal-item">No contacts available</li>
        )}
      </div>
    </ul>
  );
}

