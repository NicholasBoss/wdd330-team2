import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
const productId = getParam('product');
productDetails(productId);
console.log(findProductById(productId));
// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
 
  
  

  /* import { getParam } from "./utils.mjs";
  import productDetails from "./productDetails.mjs";
  import findProductById from "./productDetails.mjs";
  
  const productId = getParam("product");
  productDetails(productId);
  console.log(findProductById(productId)); */