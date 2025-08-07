import "./Login.scss";
import { useAppSelector } from "../../store/hooks-redux";
import Field from "../Field/Field";

interface LoginProps {
  changeField: (value: string, name: "email" | "password") => void;
}

export default function Login({ changeField }: LoginProps) {
  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );

  const handleChangeField = (name: "email" | "password") => (value: string) => {
    changeField(value, name);
  };

  return (
    <div className="login">
      <Field
        fieldDisplayedName="Email address"
        type="email"
        placeholder="Your account email address"
        onChange={handleChangeField("email")}
        value={email}
        required
      />
      <Field
        fieldDisplayedName="Password"
        type="password"
        placeholder="Your password"
        onChange={handleChangeField("password")}
        value={password}
        required
      />
    </div>
  );
}
