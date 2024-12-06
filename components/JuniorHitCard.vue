<template>
  <div class="products">
    <h1>Товары</h1>
    <div class="productList">
      <div
          v-for="productlist in filteredProducts"
          :key="productlist.name"
          class="productsList"
      >
        <div
            v-for="product in productlist"
            :key="product.name"
            class="singleProduct"
        >
          <h2>{{ product.name }}</h2>
          <img :src="product.images[0].path" :alt="product.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    filteredProducts() {
       console.log(this.products);
      return this.products.slice(7, -3).map(product => product.goods_list);
    },
  },
  mounted() {
    this.$productsStore.fetchProducts()
        .then(products => {
          this.products = products;
        })
        .catch(error => {
          console.error('Ошибка при загрузке продуктов:', error);
        });
  },
});
</script>

<style scoped>
.products{
  width: 40%;
}
.productList {
  display: flex;
  flex-wrap: wrap;
}
</style>