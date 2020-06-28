const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    const b = xhr.responseText;
                    resolve(b);
                }
            }
        }
        xhr.send();
    });
}


makeGETRequest(`${API}/catalogData.json`).then((b) => {
    console.log(b);
}, (error) => {
    console.log(error)
});



class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
        this.totalCost()
    }

    fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
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
        let x = this.goods.reduce((sum, current) => sum + current.price, 0);
        return document.write('<p class="total-cost">Всего товаров на сумму: ' + x + ' &#8381;</p>')
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.product_name;
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

new ProductList();
