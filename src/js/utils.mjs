// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  // check to see if data exists in key given, if it does, append to it
  let existingData = getLocalStorage(key) || [];

  existingData = Array.isArray(existingData) ? existingData : [existingData];

  // Always wrap data in an array and append to existingData
  existingData.push(data);

  localStorage.setItem(key, JSON.stringify(existingData));
}
// export function setLocalStorage(key, data) {
//   // check to see if data exists in key given, if it does, append to it
//   let existingData = getLocalStorage(key) || [];

//   existingData = Array.isArray(existingData) ? existingData : [existingData];

//   if (existingData.length !== 0) {
//     let newData = data;
//     existingData.push(newData);
//   } else {
//     existingData = data;
//   }
//   localStorage.setItem(key, JSON.stringify(existingData));
// }
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
} 


export function renderWithTemplate(template, parentElement, data, callback, position = "afterbegin", clear = true) {

  if (clear) {
    parentElement.innerHTML = "";
  }
    parentElement.insertAdjacentHTML(position, template);

  if (callback) {
    callback(data);
  }

}

function loadTemplate(path) {
  
  return async function () {
    const response = await fetch(path);
    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      throw new Error("Bad Response");
    }
  }
}

export async function loadHeaderFooter() {
  const header = loadTemplate("../partials/header.html");
  const footer = loadTemplate("../partials/footer.html");

  renderWithTemplate(await header(), qs("header"));
  renderWithTemplate(await footer(), qs("footer"));
}