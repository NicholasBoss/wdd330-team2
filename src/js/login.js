import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

// check for redirect parameter
const redirect = getParam("redirect");

// set a listener for form submission in a login function
document.querySelector("form").addEventListener("submit", async (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const email = formData.get("email");
const password = formData.get("password");

// check if username and password are correct
login({ email: email, password: password }, redirect);
});