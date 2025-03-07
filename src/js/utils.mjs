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

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
      if(e.target.tagName == "SPAN") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}