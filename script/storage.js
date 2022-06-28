export default class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id == id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static saveDiscount() {
    localStorage.setItem("discount", JSON.stringify(true));
  }
  static getDiscount() {
    return localStorage.getItem("discount")
      ? JSON.parse(localStorage.getItem("discount"))
      : false;
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
