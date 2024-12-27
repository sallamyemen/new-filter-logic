export default defineNuxtPlugin(() => {
    return {
        provide: {
            filteredProducts(productsList) {
                let products = productsList || [];

                let categoryMap = {
                    'cosmeceuticals': ['BEAUTY HIT'],
                    'nutraceuticals': ['CLASSIC HIT', 'DIRECT HIT', 'JUNIOR HIT', 'V ALPHABET'],
                    'titanium-bracelets': ['БРАСЛЕТЫ'],
                };

                let collectionMap = {
                    'classic-hit': 'CLASSIC HIT',
                    'direct-hit': 'DIRECT HIT',
                    'impulse-hit': 'V HIT',
                    'junior-hit': 'JUNIOR HIT',
                    'alphabet': 'V ALPHABET',
                    'switzerland-cosmetics': 'BEAUTY HIT',
                    'premium-french-care': 'BEAUTY HIT',
                    'trinity-power': 'БРАСЛЕТЫ',
                };

                const category = this.$route.params.category;
                const collection = this.$route.params.collection;

                const categoryFilter = categoryMap[category];
                const collectionFilter = collectionMap[collection];

                if (!this.$route.params.category && !this.$route.params.collection) {
                    return products
                        .filter((product) =>
                            Object
                                .values(categoryMap)
                                .flat()
                                .includes(product.name)
                        )
                        .flatMap((product) => product.goods_list || []);
                }

                if (categoryFilter && !collectionFilter) {
                    return products
                        .filter((product) => categoryFilter
                            .includes(product.name))
                        .flatMap((product) => product.goods_list || []);
                }

                if (collectionFilter) {
                    return products
                        ?.filter((product) => product.name === collectionFilter)
                        .flatMap((product) => product.goods_list || []);
                }

                return products
                    .flatMap((product) => product.goods_list || []);
            },
        },
    };
});
