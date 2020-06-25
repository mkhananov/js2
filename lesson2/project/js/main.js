class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
    }

    fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000, img: 'images/laptop.png'},
            {id: 2, title: 'Mouse', price: 1500, img: 'images/mouse.png'},
            {id: 3, title: 'Keyboard', price: 5000, img: 'images/keyboard.png'},
            {id: 4, title: 'Gamepad', price: 4500, img: 'images/gamepad.png'},
            {id: 5, title: 'Printer', price: 30000},
        ]
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }



    totalCost() {
        return this.goods.reduce(function(sum, current) {
            return sum + current.price;
        }, 0);
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = (!product.img) ? 'images/photo.png': product.img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
            <div class="product-photo">
                <img src="${this.img}" alt="Some img">
            </div>
            <h3>${this.title}</h3>
            <p>${this.price}&#8381;</p>
            <button class="by-btn">Добавить в корзину</button>
        </div>`;
    }
}


// class Cart {
//     constructor(className) {}
//
//     sum() {}
//
//     quantity() {}
//
//     checkout() {}
// }
//
// class ElCart extends Cart {}

const list = new ProductList();
list.fetchProducts();
list.render();

document.write('<p class="total-cost">Всего товаров на сумму: ' + list.totalCost() + ' &#8381;</p>')
