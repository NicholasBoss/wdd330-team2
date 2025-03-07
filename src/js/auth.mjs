import { getParam, getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";

const tokenKey = "so-token";
export async function login(creds, redirect) {
    try {
        const response = await loginRequest(creds);

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const data = await response.json();
        setLocalStorage(tokenKey, data.token);
        window.location.href = redirect ? redirect : "/";
        return data.token;
    } catch (error) {
        alertMessage(error.message);
    }
}

function isTokenValid  (token) {
/* Check to see if token exists and has not expired. If it has not expired, return true*/
    if (token) {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        return exp > Date.now() / 1000;
    } else {
        return false;   
    }
}

export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    if (token && isTokenValid(token)) {
        // redirect to the page the user was trying to access
        const redirect = getParam("redirect");
        window.location.href = redirect ? redirect : "/";
    } else {
        // redirect to the login page
        window.location.href = "/login.html";
    }
}