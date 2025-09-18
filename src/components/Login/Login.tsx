import { useAppSelector } from "../../store/hooks-redux";
import Field from "../Field/Field";
import "./Login.scss";

interface LoginProps {
  changeField: (value: string, name: "email" | "password") => void;
  isRememberMe: boolean;
  setIsRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({
  changeField,
  isRememberMe,
  setIsRememberMe,
}: LoginProps) {
  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );

  const handleChangeField = (name: "email" | "password") => (value: string) => {
    changeField(value, name);
  };

  const getBackendEndpoint = (): string => {
    if (typeof window !== "undefined" && window.APP_CONFIG) {
      return window.APP_CONFIG.BACKEND_ENDPOINT;
    }
    return "http://localhost:8000";
  };

  return (
    <div className="login">
      <Field
        fieldDisplayedName="Email address"
        type="email"
        autocomplete="email"
        placeholder="Your account email address"
        onChange={handleChangeField("email")}
        value={email}
        required
      />
      <Field
        fieldDisplayedName="Password"
        type="password"
        autocomplete="current-password"
        placeholder="Your password"
        onChange={handleChangeField("password")}
        value={password}
        required
      />
      <a
        className="password-recovery"
        href={`${getBackendEndpoint()}/reset-password`}
      >
        Forgot your password ?
      </a>
      <div className="remember-me">
        <input
          type="checkbox"
          name="RememberMe"
          checked={isRememberMe}
          onChange={() => setIsRememberMe(!isRememberMe)}
        />
        <label htmlFor="RememberMe">Stay connected</label>
      </div>
    </div>
  );
}
