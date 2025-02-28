import { findProductById } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

function addToCart() {
  setLocalStorage("so-cart", product);
  // inform the user that the product has been added to the cart
  // use a dialog box
  document.querySelector("#dialog").classList.toggle("active");
  // add a message to the dialog box
  document.querySelector("#dialogMessage").innerHTML = `${product.Name} has been added to your cart`;
}

document.querySelector("#closeButton").addEventListener("click", function () {
    document.querySelector("#dialog").classList.toggle("active");
});

export default async function ProductDetails(productId) { 
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function renderProductDetails(){
  document.getElementById("productName").innerHTML = product.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.getElementById("productFinalPrice").innerHTML = product.FinalPrice;
  document.getElementById("productColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}