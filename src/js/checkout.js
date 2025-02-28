import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zipcode")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case  
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)
    checkoutProcess.checkout(e.target);
    // clear the cart
    localStorage.removeItem("so-cart");  
    // redirect to success.html
    window.location.href = "success.html";
});