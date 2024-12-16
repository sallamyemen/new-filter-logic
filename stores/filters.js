import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
    state: () => ({
        categoriesFilters: [
            {
                title: 'Nutraceuticals',
                key: 'categories',
                items: [
                    { title: 'Nutraceuticals', key: 'nutraceuticals', isChecked: false },
                ],
                subCategories: [
                    {
                        title: 'Collections',
                        key: 'collections',
                        items: [
                            { title: 'Classic Hit', key: 'classic-hit', isChecked: false },
                            { title: 'Direct Hit', key: 'direct-hit', isChecked: false },
                            { title: 'Junior Hit', key: 'junior-hit', isChecked: false },
                            { title: 'Impulse Hit', key: 'impulse-hit', isChecked: false },
                            { title: 'Alphabet', key: 'alphabet', isChecked: false },
                        ],
                        isChecked: false,
                    },
                ],
                isChecked: false,
            },
            {
                title: 'Cosmeceuticals',
                key: 'categories',
                items: [
                    { title: 'Cosmeceuticals', key: 'cosmeceuticals', isChecked: false },
                ],
                subCategories: [
                    {
                        title: 'Collections',
                        key: 'collections',
                        items: [
                            { title: 'Switzerland Cosmetics', key: 'switzerland-cosmetics', isChecked: false },
                            { title: 'Premium French Care', key: 'premium-french-care', isChecked: false },
                        ],
                        isChecked: false,
                    },
                ],
                isChecked: false,
            },
            {
                title: 'Titanium Bracelets',
                key: 'categories',
                items: [
                    { title: 'Titanium Bracelets', key: 'titanium-bracelets', isChecked: false },
                ],
                subCategories: [
                    {
                        title: 'Collections',
                        key: 'collections',
                        items: [
                            { title: 'Trinity Power', key: 'trinity-power', isChecked: false },
                        ],
                        isChecked: false,
                    },
                ],
                isChecked: false,
            },
            {
                title: 'Sex',
                key: '',
                items:[
                    { title:null, key:null, isChecked:false },
                ],
                subCategories:[
                    {
                        title: 'Sex',
                        key: 'sex',
                        items:[
                            { title:'Men', key:'men', isChecked:false },
                            { title:'Women', key:'women', isChecked:false },
                            { title:'Children', key:'children', isChecked:false },
                        ],
                    },
                ],
                isChecked:false,
            },
            {
                title: 'Purpose',
                key: 'purpose',
                items: [
                    { title: null, key: null, isChecked: false },
                ],
                subCategories: [
                    {
                        title: 'Purpose',
                        key: 'purpose',
                        items:[
                            { title: 'Anti-Age', key: 'anti-age', isChecked: false },
                            { title: 'Brain Activity', key: 'brain-activity', isChecked: false },
                            { title: 'Efficient Detoxification', key: 'efficient-detoxification', isChecked: false },
                            { title: 'Energy Boost', key: 'energy-boost', isChecked: false },
                            { title: 'Growth and Health of Kids', key: 'growth-and-health-of-kids', isChecked: false },
                            { title: 'Genitourinary System Health', key: 'genitourinary-system-health', isChecked: false },
                            { title: 'Healthy Joints and Muscles', key: 'healthy-joints-and-muscles', isChecked: false },
                            { title: 'Heart Function', key: 'heart-function', isChecked: false },
                            { title: 'Liver Protection', key: 'liver-protection', isChecked: false },
                            { title: 'Perfect Vision', key: 'perfect-vision', isChecked: false },
                            { title: 'Stress Under Control', key: 'stress-under-control', isChecked: false },
                            { title: 'Strong Immune System', key: 'strong-immune-system', isChecked: false },
                            { title: 'Youthful Skin', key: 'youthful-skin', isChecked: false },
                        ],
                    },
                ],
                isChecked: false,
            },
        ],
    }),
});
