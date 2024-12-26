<template>
  <div>
    <ProductsList
        :products="listOfAllProducts"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  async asyncData({ $productsStore }) {
    try {
      const products = await $productsStore
          .fetchProducts();
      return { productsList: products };
    } catch (error) {
      console
          .error("Error during loading products:", error);
      return { productsList: [] };
    }
  },
  data() {
    return {
      productsList: [],
    };
  },
  computed: {
    listOfAllProducts() {
      return this.productsList
          ?.slice(4, 9)
          .map((product) => product.goods_list);
    },
  },
  // mounted() {
  //   this.$productsStore
  //       .fetchProducts()
  //       .then((products) => {
  //         this.productsList = products;
  //       })
  //       .catch((error) => {
  //         console.error("Error during loading products:", error);
  //       });
  // },
});
</script>
