import "./Register.scss";
import { useAppSelector } from "../../store/hooks-redux";
import Field from "../Field/Field";

interface RegisterProps {
  changeField: (
    value: string,
    name: "firstName" | "lastName" | "email" | "password"
  ) => void;
}

export default function Register({ changeField }: RegisterProps) {
  const firstName = useAppSelector(
    (state) => state.userReducer.connectedUser.firstName
  );

  const lastName = useAppSelector(
    (state) => state.userReducer.connectedUser.lastName
  );
  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );

  const handleChangeField =
    (name: "firstName" | "lastName" | "email" | "password") =>
    (value: string) => {
      changeField(value, name);
    };

  return (
    <div className="register">
      <Field
        fieldDisplayedName="First name"
        type="input"
        placeholder="Your first name"
        onChange={handleChangeField("firstName")}
        value={firstName}
        required
      />
      <Field
        fieldDisplayedName="Last name"
        type="input"
        placeholder="Your last name"
        onChange={handleChangeField("lastName")}
        value={lastName}
        required
      />
      <Field
        fieldDisplayedName="Adresse mail"
        type="email"
        placeholder="Votre adresse mail de compte"
        onChange={handleChangeField("email")}
        value={email}
        required
      />
      <Field
        fieldDisplayedName="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        onChange={handleChangeField("password")}
        value={password}
        required
      />
    </div>
  );
}
