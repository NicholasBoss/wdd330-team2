import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const prices = document.querySelectorAll(".cart-card__price");
    let total = 0;

    prices.forEach(price => {
      total += parseFloat(price.textContent.replace("$", ""));
    });

    document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
  });