import "./Login.scss";

import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks-redux";
import Field from "../../Field/Field";
import login from "../../../store/middlewares/login";

interface LoginProps {
  changeField: (value: string, name: "email" | "password") => void;
}

function Login({ changeField }: LoginProps) {
  const dispatch = useAppDispatch();

  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );

  const handleChangeField = (name: "email" | "password") => (value: string) => {
    changeField(value, name);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      <form className="login" onSubmit={handleSubmit}>
        <p>
          Les champs obligatoires sont suivis par un
          <span aria-label="required"> *</span>
        </p>
        <Field
          fieldDisplayedName="Adresse mail"
          type="email"
          placeholder="Votre adresse mail de compte"
          onChange={handleChangeField("email")}
          value={email}
          required
          search={false}
          edit={false}
        />
        <Field
          fieldDisplayedName="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          onChange={handleChangeField("password")}
          value={password}
          required
          search={false}
          edit={false}
        />
      </form>
    </div>
  );
}

export default Login;
