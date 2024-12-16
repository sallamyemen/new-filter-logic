<template>
  <div class="wrapper">
    <FiltersAside class="filter"  />
    <AllProducts class="products" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;

  .products{
    width: 40%;
  }
  .product-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
