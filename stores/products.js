import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
    }),
    actions: {
        async fetchProducts() {
            try {
                const response = await fetch(
                    "https://api.sessia.com/api/market/6/showcase-tree"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = response.json();

                this.products = data;

                return this.products;

            } catch (error) {
                console.error("Error failed fetching products:", error);
            }
        },
    },
});
