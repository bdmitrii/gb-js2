/*
  requires:
  user.js
  product.js
*/

const user = new User('Dima');

user.addProduct(new Product('Milk', 20));
user.addProduct(new Product('Bread', 30));

console.log(user.products);