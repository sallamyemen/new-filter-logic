<template>
  <div class="products">
    <h1>Товары</h1>
    <div class="product-list">
      <div v-for="product in products" :key="product.name" class="product">
        <h2>{{ product.name }}</h2>
        <img :src="product.image" :alt="product.name" />
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
  mounted() {
    this.$productsStore.fetchProducts()
        .then(products => {
          this.products = products;
        })
        .catch(error => {
          console.error('Ошибка при загрузке продуктов:', error);
        });
  },
  data() {
    return {
      products: []
    };
  },
  // created() {
  //   this.fetchProducts();
  // },
  // methods: {
  //   async fetchProducts() {
  //     const productsStore = useProductsStore();
  //     await productsStore.fetchProducts();
  //     this.products = productsStore.products;
  //   }
  // }
});
</script>

<style scoped>
.products{
  width: 40%;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>