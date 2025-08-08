import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import addContactToTask from "../../store/middlewares/addContactToTask";
import "./AddContactModal.scss";

interface AddContactModalProps {
  position: DOMRect;
  taskId: number;
}

export default function AddContactModal({
  position,
  taskId,
}: AddContactModalProps) {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(
    (state) => state.userReducer.connectedUser.contacts
  );

  const handleAddContact = (userId: number) => {
    dispatch(addContactToTask({ userId, taskId }));
  };

  return (
    <div
      className="add-contact-modal"
      style={{ left: position.right, top: position.top }}
    >
      <ul className="add-contact-modal-container">
        {contacts ? (
          contacts.map((contact) => (
            <li key={contact.id} className="add-contact-modal-item">
              <button
                type="button"
                className="add-contact-modal-item-name"
                onClick={() => handleAddContact(contact.id)}
              >
                {`+ ${contact.firstName} ${contact.lastName}`}
              </button>
            </li>
          ))
        ) : (
          <li className="add-contact-modal-item">No contacts available</li>
        )}
      </ul>
    </div>
  );
}

