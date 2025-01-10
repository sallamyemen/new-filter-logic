import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
    }),
    actions: {
        async fetchProducts() {
            const API_URL = "https://api.sessia.com/api/market/6/showcase-tree";

            try {
                let response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    this.products = data;
                } else {
                    console.warn("Unexpected response format:", data);
                }

                return this.products;
            } catch (error) {
                console.error("Error while fetching products:", error);

                return [];
            }
        },
    },
});
