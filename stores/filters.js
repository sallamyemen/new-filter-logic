import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
    state: () => ({
        categoriesFilters: [
            {
                title: 'Nutraceuticals',
                key: 'category',
                items: [
                    {
                        title: 'Nutraceuticals',
                        key: 'nutraceuticals',
                    },
                ],
                subCategories: [
                    {
                        title: 'Collection',
                        key: 'collection',
                        items: [
                            { title: 'Classic Hit', key: 'classic-hit' },
                            { title: 'Direct Hit', key: 'direct-hit' },
                            { title: 'Junior Hit', key: 'junior-hit' },
                            { title: 'Impulse Hit', key: 'impulse-hit' },
                            { title: 'Alphabet', key: 'alphabet' },
                        ],
                    },
                ],
            },
            {
                title: 'Cosmeceuticals',
                key: 'category',
                items: [
                    {
                        title: 'Cosmeceuticals',
                        key: 'cosmeceuticals',
                    },
                ],
                subCategories: [
                    {
                        title: 'Collection',
                        key: 'collection',
                        items: [
                            { title: 'Switzerland Cosmetics', key: 'switzerland-cosmetics' },
                            { title: 'Premium French Care', key: 'premium-french-care' },
                        ],
                    },
                ],
            },
            {
                title: 'Titanium Bracelets',
                key: 'category',
                items: [
                    {
                        title: 'Titanium Bracelets',
                        key: 'titanium-bracelets',
                    },
                ],
                subCategories: [
                    {
                        title: 'Collection',
                        key: 'collection',
                        items: [
                            { title: 'Trinity Power', key: 'trinity-power' },
                        ],
                    },
                ],
            },
            {
                title: 'Sex',
                key: 'sex',
                items: [
                    { title: 'Men', key: 'men' },
                    { title: 'Women', key: 'women' },
                    { title: 'Children', key: 'children' },
                ],
                subCategories: [],
            },
            {
                title: 'Purpose',
                key: 'problem',
                items: [
                    { title: 'Anti-Age', key: 'anti-age' },
                    { title: 'Brain Activity', key: 'brain-activity' },
                    { title: 'Efficient Detoxification', key: 'efficient-detoxification' },
                    { title: 'Energy Boost', key: 'energy-boost' },
                    { title: 'Growth and Health of Kids', key: 'growth-and-health-of-kids' },
                    { title: 'Genitourinary System Health', key: 'genitourinary-system-health' },
                    { title: 'Healthy Joints and Muscles', key: 'healthy-joints-and-muscles' },
                    { title: 'Heart Function', key: 'heart-function' },
                    { title: 'Liver Protection', key: 'liver-protection' },
                    { title: 'Perfect Vision', key: 'perfect-vision' },
                    { title: 'Stress Under Control', key: 'stress-under-control' },
                    { title: 'Strong Immune System', key: 'strong-immune-system' },
                    { title: 'Youthful Skin', key: 'youthful-skin' },
                ],
                subCategories: [],
            },
        ],
    }),
});
