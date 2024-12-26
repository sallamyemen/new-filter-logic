<template>
  <div>
    <ProductsList
        :products="filteredProducts"
    />
<!--    <ProductsList v-if="filteredProducts.length" :products="filteredProducts" />-->
<!--    <p v-else>Загрузка...</p>-->
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
  // async fetch() {
  //   try {
  //     this.productsList = await this.$productsStore.fetchProducts();
  //   } catch (error) {
  //     console.error("Error during loading products:", error);
  //   }
  // },

  computed: {
    filteredProducts() {
      let products = this.productsList;

      if (typeof this.$route.params.category !== "undefined") {
        if (typeof this.$route.params.collection !== "undefined") {
          switch (this.$route.params.collection) {
            case "classic-hit":
              return products
                  ?.filter((product) => product.name === "CLASSIC HIT")
                  .map((product) => product.goods_list);
            case "direct-hit":
              return products
                  ?.filter((product) => product.name === "DIRECT HIT")
                  .map((product) => product.goods_list);
            case "impulse-hit":
              return products
                  ?.filter((product) => product.name === "V HIT")
                  .map((product) => product.goods_list);
            case "junior-hit":
              return products
                  ?.filter((product) => product.name === "JUNIOR HIT")
                  .map((product) => product.goods_list);
            case "alphabet":
              return products
                  ?.filter((product) => product.name === "V ALPHABET")
                  .map((product) => product.goods_list);
            case "switzerland-cosmetics":
              return products
                  ?.filter((product) => product.name === "BEAUTY HIT")
                  .map((product) => product.goods_list);
            case "premium-french-care":
              return products
                  ?.filter((product) => product.name === "BEAUTY HIT")
                  .map((product) => product.goods_list);
            case "trinity-power":
              return products
                  ?.filter((product) => product.name === "БРАСЛЕТЫ")
                  .map((product) => product.goods_list);
          }
        }

        switch (this.$route.params.category) {
          case "cosmeceuticals":
            return products
                ?.filter((product) => product.name === "BEAUTY HIT")
                .map((product) => product.goods_list);
          case "nutraceuticals":
            return products
                ?.slice(4, 7)
                .map((product) => product.goods_list);
          case "titanium-bracelets":
            return products
                ?.filter((product) => product.name === "БРАСЛЕТЫ")
                .map((product) => product.goods_list);
          default:
            return [];
        }
      } else {
        return [];
      }
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