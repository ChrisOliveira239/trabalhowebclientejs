export default class Data {
  static async getProducts() {
    try {
      const result = await (await fetch("/data/products.json")).json();
      const products = result.items;
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
