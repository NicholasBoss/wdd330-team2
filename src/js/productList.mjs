import { getData } from "./productData.mjs";

export async function productList(category) {
    let data = await getData(category);
    return data;
}


// function productCardTemplate(product) {
//     return `<li class="product-card">
//     <a href="product_pages/index.html?product=">
//     <img
//       src=""
//       alt="Image of "
//     />
//     <h3 class="card__brand"></h3>
//     <h2 class="card__name"></h2>
//     <p class="product-card__price">$</p></a>
//   </li>`}