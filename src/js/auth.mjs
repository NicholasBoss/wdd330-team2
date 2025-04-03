import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";
export async function login(creds, redirect) {
    try {
        const response = await loginRequest(creds);
        console.log("Response from login", response);
        if (!response) {
            throw new Error("Invalid username or password");
        }

        const data = response
        setLocalStorage(tokenKey, data);
        window.location.href = redirect ? redirect : "/";
        return data.token;
    } catch (error) {
        alertMessage(error.message);
    }
}

function isTokenValid  (token) {
/* Check to see if token exists and has not expired. If it has not expired, return true*/
    if (token) {
        // console.log(token)
        const decoded = jwtDecode(token);
        let currentDate = new Date()
        if (decoded.exp * 1000 < currentDate.getTime()) {
            return false
        } else {
            return true
        }
    } else {
        return false;
    }
}

export function checkLogin() {
    // get the token from localStorage
    const token = getLocalStorage(tokenKey);
    // console.log("Token from checkLogin", token[0].accessToken)
    // use the isTokenValid function to check the validity of our token
    const valid = isTokenValid(token[0].accessToken);
    // if the token is NOT valid
    if (!valid) {
      //remove stored token
      localStorage.removeItem(tokenKey);
      // redirect to login while sending the current URL along as a parameter
      // grab the current location from the browser
      const location = window.location;
      // check out what location contains
      console.log(location);
      // redirect by updating window.location =
      window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token; //if they are logged in then just return the token.
  }