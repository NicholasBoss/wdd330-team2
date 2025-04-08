import { getProductsByCategory } from "./externalServices.mjs";

function createProductCard(markup) {
    let list = document.querySelector(".product-list");
    list.insertAdjacentHTML("beforeend", markup);
}

export async function productList(category) {
    let products = await getProductsByCategory(category);
    // console.log(products);
    products.slice(0, 4).forEach(product => {
    // products.forEach(product => {
        const discount = product.SuggestedRetailPrice.toFixed(2) - product.FinalPrice.toFixed(2);
        const discountFlag = (discount * 100) / product.SuggestedRetailPrice.toFixed(2);
        let markup = `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
        <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">${product.ListPrice}
        <span class="discount"> save $${discount.toFixed(2)} </span> <span class="discount_flag">${discountFlag.toFixed(0)} % off!</span>
        </p></a>
        </li>`
        createProductCard(markup);
        });
    }































// export async function productList(category) {
//     let data = await getProductsByCategory(category);
//     return data;
// }


// export function productCardTemplate(product) {
//     return `<li class="product-card">
//     <a href="product_pages/index.html?product={product.id}">
//     <img
//       src="{product.image}"
//       alt="Image of {product.name}"
//     />
//     <h3 class="card__brand">{product.brand}</h3>
//     <h2 class="card__name">{product.name}</h2>
//     <p class="product-card__price">${product.price}</p></a>
//   </li>`
// }

// export async function renderList(data) {
//     let list = document.querySelector(".product-list");
//     console.log(data[0]);
//     list.innerHTML = "";
//     data.forEach((product) => {
//         list.innerHTML += productCardTemplate(product);
//     });
// }

// renderList(productList("tents"));

// pass in `ul` element somewhere
