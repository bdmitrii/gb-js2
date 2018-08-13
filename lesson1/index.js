Humburger.SIZE_SMALL = 1;
Humburger.SIZE_LARGE = 2;
Humburger.STUFFING_CHEESE = 10;
Humburger.STUFFING_SALAD = 11;
Humburger.STUFFING_POTATO = 12;
Humburger.TOPPING_MAYO = 13;
Humburger.TOPPING_SPICE = 14;
Humburger.stuffing = [10, 11, 12];
Humburger.topping = [13, 14];

function Humburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];

    if (!(stuffing instanceof Array)) throw new HumburgerException('Stuffing should be array');
}

Humburger.prototype.addTopping = function(topping) {

    if (Humburger.topping.indexOf(topping) === -1) throw new HumburgerException('Topping doesn\'t exist');

    if (this.topping.indexOf(topping) !== -1) {
        this.removeTopping(topping);
    }
    else {
        this.topping.push(topping);
    }

}

Humburger.prototype.removeTopping = function(topping) {
    
    if (Humburger.topping.indexOf(topping) === -1) throw new HumburgerException('Topping doesn\'t exist');

    if (this.topping.indexOf(topping) === -1) throw new HumburgerException('Topping isn\'t included');

    return this.topping.filter(t => topping !== t);
}

Humburger.prototype.getToppings = function() {
    return this.topping;
}

Humburger.prototype.getSize = function() {
    return this.size;
}

Humburger.prototype.getStuffing = function() {
    return this.stuffing;
}

Humburger.prototype.calculatePrice = function() {
    var price = 0;

    for (let i = 0; i < this.topping.length; i++) {
        switch (this.topping[i]) {
            case (Humburger.TOPPING_MAYO):
                price += 20;
                break;
            case (Humburger.TOPPING_SPICE):
                price += 15;
                break;
        }
    }

    for (let i = 0; i < this.stuffing.length; i++) {
        switch (this.stuffing[i]) {
            case (Humburger.STUFFING_SALAD):
                price += 20;
                break;
            case (Humburger.STUFFING_CHEESE):
                price += 10;
                break;
            case (Humburger.STUFFING_POTATO):
                price += 15;
                break;
        }
    }

    return price;
}

Humburger.prototype.calculateCalories = function() {
    var calories = 0;

    for (let i = 0; i < this.topping.length; i++) {
        switch (this.topping[i]) {
            case (Humburger.TOPPING_MAYO):
                calories += 5;
                break;
            case (Humburger.TOPPING_SPICE):
                calories += 0;
                break;
        }
    }

    for (let i = 0; i < this.stuffing.length; i++) {
        switch (this.stuffing[i]) {
            case (Humburger.STUFFING_SALAD):
                calories += 5;
                break;
            case (Humburger.STUFFING_CHEESE):
                calories += 20;
                break;
            case (Humburger.STUFFING_POTATO):
                calories += 10;
                break;
        }
    }

    return calories;
}

function HumburgerException(message) {
    this.message = message + (new Error()).message;
    this.stack = (new Error(this.message)).stack;
}

HumburgerException.prototype = Object.create(Error.prototype);
HumburgerException.prototype.name = "HumburgerException";
HumburgerException.prototype.constructor = HumburgerException;


var burger = new Humburger(Humburger.SIZE_LARGE, [Humburger.STUFFING_CHEESE]);
burger.addTopping(Humburger.TOPPING_MAYO);
burger.addTopping(Humburger.TOPPING_SPICE);
console.log(burger.getToppings());
console.log(burger.calculatePrice());
console.log(burger.calculateCalories());
