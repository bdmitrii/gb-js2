class User {
  constructor(name) {
    this.name = name;
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }
}