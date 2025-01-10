<template>
  <div class="wrapper">
    <FiltersAside
        class="filters"
    />
    <ProductsList
        :products="filteredProducts"
        class="collections"
    />
  </div>
</template>

<script class="wrapper">
export default defineNuxtComponent({
  async asyncData({ $productsStore, params }) {
    try {
      const products = await $productsStore
          .fetchProducts();
      return { products };
    } catch (error) {
      console.error("Error loading products:", error);
      return { products: [], params: {} };
    }
  },

  computed: {
    filteredProducts() {
      return this.$filteredProducts(this.products);
    },
  },
});
</script>

<style lang="scss">
.wrapper {
  display: flex;
}

.filters{
  width: 30%;
}

.products{
  width: 40%;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}

.collections {
  width: 40%;
}
</style>
