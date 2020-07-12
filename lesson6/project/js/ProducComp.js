Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filteredGoods: [],
            products: [],
            imgCatalog: 'images/photo.png',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filteredGoods = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);

                }
            });
        this.filteredGoods = this.products;
    },
    template: `
        <div class="products">
            <product v-for="item of filteredGoods" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: this.$root.$refs.cart,
      };
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});