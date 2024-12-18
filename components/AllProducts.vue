<template>
  <div class="products">
    <h1>Товары</h1>
    <div class="products__list">
      <div
          v-for="productlist in listОfAllProducts"
          :key="productlist.name"
          class="products__list"
      >
        <div
            v-for="product in productlist"
            :key="product.name"
            class="products__single-product"
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
    listОfAllProducts() {
      return this.products.slice(4, 9).map(product => product.goods_list);
    },
  },
  mounted() {
    this.$productsStore.fetchProducts()
        .then(products => {
          this.products = products;
        })
        .catch(error => {
          console.error('Error during loading products:', error);
        });
  },
});
</script>

<style scoped>
.products{
  width: 40%;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}

</style>