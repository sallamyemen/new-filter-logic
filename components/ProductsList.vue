<template>
  <div class="products">
    <h1>Товары</h1>
    <div class="products__list">
      <div
          v-for="productlist in products"
          :key="productlist.name"
          class="products__list"
      >
        <div
            v-for="product in productlist"
            :key="product.id"
            class="products__single-product"
        >
          <h2>{{ product.name }}</h2>
          <img :src="product?.images[0].path" :alt="product.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: "ProductsList",
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.products{
  width: 40%;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}

</style>