import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init(key, outputSelector) {
        this.key = key;
        this.output = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemsSummary();
    },
    calculateItemsSummary() {
        let total = 0;
        let items = 0;
        this.list.forEach(item => {
            total += item.price * item.quantity;
            items += item.quantity;
        });
        this.total = total;
        this.items = items;
    },
    calculateOrderTotal() {
        const shipping = 10;
        const tax = 0.06;
        const total = this.total + shipping + (this.total * tax);
        this.displayOrderTotal(total);
    },
    displayOrderTotal(total) {
        const output = document.querySelector("#orderSummary");
        output.innerHTML = `
            <p>Items: ${this.items}</p>
            <p>Total: $${total.toFixed(2)}</p>
        `;
    }
}
export default checkoutProcess;