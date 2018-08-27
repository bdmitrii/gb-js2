const baseURL = 'http://89.108.65.123:8080';

class Request {
    constructor(url) {
        this.url = url;
    }
    
    async send() {
        return await fetch(this.url)
        .then( cart => cart.json())
    }
}

class Cart {
    constructor() {
        this.create();
    }
    
    async getCart() {
        const user = await fetch(`${baseURL}/shop?user_id=${this.user_id}`).then((user) => user.json());
        return user.cart;
        console.log(user.cart);
    }
    
    async render(container) {
        container.html('');
        const cart = await this.getCart();
        console.log(cart);
        
        for (let i = 0; i < cart.length; i++) {
            container.append(`
            <div class="product-item">
            <li class="list-group-item" data-product-id=${cart[i].product_id}>${cart[i].product}</li>
            <a class="btn-danger product-item-remove-btn">X</a>
            </div>
            `);
        }
        
        
    }
    
    async create() {
        if (window.localStorage.getItem('user_id')) {
            this.user_id = window.localStorage.getItem('user_id')
            this.user = await fetch(`${baseURL}/shop?user_id=${this.user_id}`).then( user => user.json());
        }
        else {
            this.user = await fetch(`${baseURL}/shop`).then( user => user.json());
            this.user_id = this.user.user_id;
            window.localStorage.setItem('user_id', this.user_id);
        }
    }
    
    async add(product) {
        await fetch(`${baseURL}/shop?user_id=${this.user_id}&product=${product.name}&price=${product.price}`,
        {
            method: 'POST'
        });
    }
    
    async remove(productId) {
        await fetch(`${baseURL}/shop?user_id=${this.user_id}&product_id=${productId}`, {
            method: 'DELETE'
        })
        .then(user => this.user = user);
    }
}

class Product {
    
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    get() {
        return {
            name: this.name,
            price: this.price
        }
    }
}

$('document').ready(async () => {
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 1000,
        dots: true,
        nfinite: true,
        slidesToShow: 2,
        slidesToScroll: 3
    })


    const cart = new Cart();
    await cart.render($('.list-group'));
    
    let product;
    
    let comments = await fetch(`${baseURL}/comments`).then( comments => comments.json());
    
    for (let i = 0; i < comments.length; i++) {
        $('.comments-wrapper').append(`<p class="comment my-2 shadow-sm p-2">${comments[i].text}</p>`)
    }
    
    $('.btn-send').on('click', async function(e) {
        let productName = $(this).siblings('.card-title').attr('data-product-name');
        let productPrice = $(this).siblings('.card-text').attr('data-product-price');
        
        product = await new Product(productName, productPrice);
        
        await cart.add(product);
        cart.render($('.list-group'));
    });
    
    $('.list-group').on('click', async function(e) {
        const target = e.target;
        
        if (!$(target).hasClass('product-item-remove-btn')) return;
        
        const id = $(target).siblings('.list-group-item').attr('data-product-id');
        await cart.remove(id);
        cart.render($('.list-group'));
        
    });
    
    $('#comment-form').on('submit', async function(e) {
        const commentText = $('#text-area').val();
        const newComment = await fetch(`${baseURL}/comments?text=${commentText}`, {method: 'POST'}).then( comment => comment.json());
        console.log(newComment);
        comments = await fetch(`${baseURL}/comments`).then( comments => comments.json());
        
        $('.comments-wrapper').html('');
        for (let i = 0; i < comments.length; i++) {
            $('.comments-wrapper').append(`<p class="comment my-2 shadow-sm p-2">${comments[i].text}</p>`)
        }
        
        
        e.preventDefault();
    });
    
    

    $('#user-age').on('blur', function (e) {
        
        const ageString = $(this).val();
        const regexp = ageString.match(/(\d\d)\.(\d\d)\.(\d\d)/);
        
        if (!regexp) {
            $(this).css('border', '2px solid red');
            $(this).effect('bounce');

        }
        else {
            $(this).css('border', '2px solid green');
        }
    })
})


