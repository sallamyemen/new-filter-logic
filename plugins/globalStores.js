//import {useFiltersStore} from "../stores/filters";
export default defineNuxtPlugin(({ $pinia }) => {
    const productsStore = useProductsStore($pinia);
    const filtersStore = useFiltersStore($pinia);

    return {
        provide: {
            productsStore,
            filtersStore,
        },
    };
});
