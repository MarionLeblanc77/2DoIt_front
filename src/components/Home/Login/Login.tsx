import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import "./Login.scss";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../../@types/jwtPayloard";
import { useAppDispatch } from "../../../store/hooks-redux";
import googleLogin from "../../../store/middlewares/googleLogin";

function Login() {
  const dispatch = useAppDispatch();

  const handleGoogleLogin = (newValue: string) => {
    dispatch(googleLogin(newValue));
  };

  return (
    <div className="login">
      <GoogleLogin
        onSuccess={(credentialResponse: CredentialResponse) => {
          if (typeof credentialResponse.credential === "string") {
            const credentialResponseDecoded: JwtPayload = jwtDecode(
              credentialResponse.credential
            );
            if (credentialResponseDecoded.email) {
              handleGoogleLogin(credentialResponseDecoded.email);
            }
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Login;
