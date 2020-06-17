const products = [
    {id: 1, title: 'Notebook', price: 20000, img: 'laptop'},
    {id: 2, title: 'Mouse', price: 1500, img: 'mouse'},
    {id: 3, title: 'Keyboard', price: 5000, img: 'keyboard'},
    {id: 4, title: 'Gamepad', price: 4500, img: 'gamepad'},
    {id: 5, title: 'Printer', price: 30000, img: ''},
];

const renderProduct = (title, price, image) => {
    return `<div class="product-item">
                <div class="product-photo">
                    <img src="images/${image}.png" alt="">
                </div>
                <h3>${title}</h3>
                <p>${price}&#8381;</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = list => {
    document.querySelector('.products').innerHTML = list.map(item => {
        if (item.img === '') item.img = 'photo';
        return renderProduct(item.title, item.price, item.img);
    }).join("");
};


renderProducts(products);
