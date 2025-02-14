import { productList } from "./productList.mjs"
import { getParam } from "./utils.mjs";
productList(getParam("category"));