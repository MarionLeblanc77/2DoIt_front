import { X } from "react-feather";
import stringToColor from "../../utils/stringToColor";
import "./UserIcon.scss";
import { useAppDispatch } from "../../store/hooks-redux";
import deleteContactFromTask from "../../store/middlewares/deleteContactFromTask";

interface UserIconProps {
  id: number;
  firstName: string;
  lastName: string;
  taskId: number;
}

export default function UserIcon({
  id,
  firstName,
  lastName,
  taskId,
}: UserIconProps) {
  const dispatch = useAppDispatch();
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const backgroundColor = stringToColor(`${firstName}${lastName}`);

  const handleClickDeleteUser = () => {
    dispatch(deleteContactFromTask({ taskId, userId: id }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClickDeleteUser();
    }
  };

  return (
    <div
      role="button"
      className={`user-icon user-icon-${id}`}
      style={{ backgroundColor }}
      tabIndex={0}
      aria-label={`Remove ${firstName} ${lastName}`}
      onClick={handleClickDeleteUser}
      onKeyDown={handleKeyDown}
    >
      <X className="user-icon-delete" color="white" aria-hidden="true" />
      <p className="user-icon-initials">{initials}</p>
    </div>
  );
}

