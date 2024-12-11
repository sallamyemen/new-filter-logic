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

  // asyncData(nuxtApp) {
  //   try{
  //     const route = useRoute();
  //     //const products = await $productsStore.fetchProducts();
  //     // return { route, products };
  //     return { route };
  //   } catch (error){
  //     console.error('Ошибка:', error);
  //   }
  // },



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

      const urlPath = this.$route.path || [];
      const parts = urlPath.split('/');
      const catalogIndex = parts.indexOf('catalog');

      if (catalogIndex !== -1 && catalogIndex + 1 < parts.length) {
        const filteredParts = parts.slice(catalogIndex + 1).filter(Boolean);
        const lastPart = filteredParts[filteredParts.length - 1];

        if (lastPart) {
          switch (lastPart) {
            case "classic-hit":
              return this.products.slice(5, -5).map(product => product.goods_list);
            case "direct-hit":
              return this.products.slice(6, -4).map(product => product.goods_list);
            case "impulse-hit":
              return this.products.slice(2, -8).map(product => product.goods_list);
            case "junior-hit":
              return this.products.slice(7, -3).map(product => product.goods_list);
            case "alphabet":
              return this.products.slice(4, -6).map(product => product.goods_list);
            case "switzerland-cosmetics":
              return this.products.slice(8, -2).map(product => product.goods_list);
            case "premium-french-care":
              return this.products.slice(8, -2).map(product => product.goods_list);
            case "trinity-power":
              return this.products.slice(9, -1).map(product => product.goods_list);
            default:
              return [];
          }
        }
      }
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