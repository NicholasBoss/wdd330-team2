import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        productlist: resolve(__dirname, "src/product-list/index.html"),
        orders: resolve(__dirname, "src/orders/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        header: resolve(__dirname, "src/partials/header.html"),
        footer: resolve(__dirname, "src/partials/footer.html"),
      },
    },
  },
});
