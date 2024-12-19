<template>
  <div class="products">
    <h1>Товары</h1>
    <div class="products__list">
      <div
          v-for="productlist in filteredProducts"
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
    filteredProducts() {

      console.log(this.products);

      if(typeof this.$route.params.category !== "undefined")
      {
        if(typeof this.$route.params.collection !== "undefined")
        {
          switch (this.$route.params.collection) {
            case "classic-hit":
              return this.products.filter(product => product.name == 'CLASSIC HIT').map(product => product.goods_list);
            case "direct-hit":
              return this.products.filter(product => product.name == 'DIRECT HIT').map(product => product.goods_list);
            case "impulse-hit":
              return this.products.filter(product => product.name == 'V HIT').map(product => product.goods_list);
            case "junior-hit":
              return this.products.filter(product => product.name == 'JUNIOR HIT').map(product => product.goods_list);
            case "alphabet":
              return this.products.filter(product => product.name == 'V ALPHABET').map(product => product.goods_list);
            case "switzerland-cosmetics":
              return this.products.filter(product => product.name == 'BEAUTY HIT').map(product => product.goods_list);
            case "premium-french-care":
              return this.products.filter(product => product.name == 'BEAUTY HIT').map(product => product.goods_list);
            case "trinity-power":
              return this.products.filter(product => product.name == 'БРАСЛЕТЫ').map(product => product.goods_list);
          }
        }

        switch (this.$route.params.category) {
          case "cosmeceuticals":
            return this.products.filter(product => product.name == 'BEAUTY HIT').map(product => product.goods_list);
          case "nutraceuticals":
            return this.products.slice(4, 7).map(product => product.goods_list);
          case "titanium-bracelets":
            return this.products.filter(product => product.name == 'БРАСЛЕТЫ').map(product => product.goods_list);
          default:
            return [];
        }

      }else{
        return [];
      }

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