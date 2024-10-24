import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import "./Login.scss";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { JwtPayload } from "../../../@types/jwtPayloard";

function Login() {
  const [userData, setUserData] = useState(null);
  return (
    <div className="login">
      {!userData && (
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            if (typeof credentialResponse.credential === "string") {
              const credentialResponseDecoded: JwtPayload = jwtDecode(
                credentialResponse.credential
              );
              const retrievedUserData = {
                first_name: credentialResponseDecoded.given_name,
                last_name: credentialResponseDecoded.family_name,
                email: credentialResponseDecoded.email,
              };
              setUserData(retrievedUserData);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
}

export default Login;
