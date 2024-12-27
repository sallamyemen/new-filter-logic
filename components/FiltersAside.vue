<template>
  <div>
    <h1>Product Filters</h1>
    <div v-for="(category, categoryIndex) in categoriesFilters"
         :key="category.key"
         class="categories">
      <div class="categories__items">
        <ul>
          <li v-for="item in category.items" v-if="categoryIndex < 3" :key="item.key">
            <input type="checkbox"
                   :id="item.key"
                   :value="item.key"
                   :checked="item.isChecked"
                   v-model="selectedItems"
                   @change="handleCheckboxChange(item.key, categoryIndex, 'parent')"
            />
            <label :for="item.key">{{
                item.key
              }}</label>
          </li>
        </ul>
      </div>
      <div class="categories__subcategories" v-if="category.subCategories">
        <div v-for="subCategory in category.subCategories" :key="subCategory.key">
          <ul class="ml-4">
            <li v-for="subItem in subCategory.items" :key="subItem.key">
              <input type="checkbox"
                     :id="subItem.key"
                     :value="subItem.key"
                     :checked="subCategory.isChecked"
                     v-model="selectedItems"
                     @change="handleCheckboxChange(subItem.key, categoryIndex, 'subcategory')"
              />
              <label :for="subItem.key">{{
                  subItem.key
                }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <h2>Selected Items:</h2>
      <ul>
        <li v-for="key in selectedItems"
            :key="key">{{
            key
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({

  data() {
    return {
      selectedItems: [],
      categoriesFilters: this
          .$filtersStore.categoriesFilters
    };
  },

  created() {
    if(this.$route.params.category) {
      this.selectedItems
          .push(this.$route.params.category);
    }

    if(this.$route.params.collection) {
      this.selectedItems
          .push(this.$route.params.collection);
    }

    Object.values(this.$route.query)
        .forEach(value => {
      this.selectedItems
          .push(...value.split(','));
    });
  },

  methods: {
    handleCheckboxChange(itemKey, categoryIndex, type) {

      if (type === 'parent') {
        this
            .updateParentCategory(categoryIndex);
      } else if (type === 'subcategory') {
        this
            .updateParentOnSubcategoryChange(categoryIndex);
      }

      let { pathSegments, queryParams } = this
          .createFilterParams();
      let { segments, parameters } = this
          .processFilterParams(pathSegments, queryParams);

      this.updateRoute(segments, parameters);
    },

    updateParentCategory(categoryIndex) {

      let category = this.categoriesFilters[categoryIndex];
      const isParentChecked = this.selectedItems
          .includes(category.items[0].key);

      if (isParentChecked) {
        this
            .selectAllSubcategories(category);
      } else {
        this
            .deselectAllSubcategories(category);
      }

      this.selectedItems = [...new Set(this.selectedItems)];
    },

    selectAllSubcategories(category) {

      if (category.items) {

        let newItems = category.items
            .filter(item => !this.selectedItems
                .includes(item.key))
            .map(item => item.key);
        this.selectedItems
            .push(...newItems);
      }

      if (category.subCategories) {
        let newItems = category.subCategories
            .reduce((acc, subCategory) => {
          let keys = subCategory.items
              .filter(subItem => !this.selectedItems
                  .includes(subItem.key))
              .map(subItem => subItem.key);
          return acc.concat(keys);
        }, []);

        this.selectedItems.push(...newItems);
      }

    },

    deselectAllSubcategories(category) {

      if (category.items) {
        const keysToRemove = category.items
            .map(item => item.key);

        this.selectedItems = this.selectedItems
            .filter(selected => !keysToRemove
                .includes(selected));
      }

      if (category.subCategories) {
        const keysToRemove = category.subCategories
            .flatMap(subCategory => subCategory.items
                .map(subItem => subItem.key));

        this.selectedItems = this.selectedItems
            .filter(selected => !keysToRemove
                .includes(selected));
      }
    },

    updateParentOnSubcategoryChange(categoryIndex) {
      let category = this.categoriesFilters[categoryIndex];

      let isAnySubcategoryChecked = false;
      if (category.subCategories) {
        isAnySubcategoryChecked = category.subCategories
            .some((subCategory) =>
            subCategory.items
                .some((subItem) =>
                this.selectedItems
                    .includes(subItem.key)
            )
        );
      }

      if (isAnySubcategoryChecked) {
        if (!this.selectedItems
            .includes(category.items[0].key)) {
          this.selectedItems
              .push(category.items[0].key);
        }
      } else {
        this.selectedItems = this.selectedItems
            .filter(
          (selected) => selected !== category.items[0].key
        );
      }
    },

    createFilterParams() {
      let pathSegments = {};
      let queryParams = {};

      this.selectedItems
          .forEach(item => {
            let { categoryKey, parentKey } = this
            .findCategoryKeyBySelectedItem(item, this.categoriesFilters);

            if (categoryKey
                .includes('categories') || categoryKey
                .includes('collections')) {
              pathSegments[categoryKey] = pathSegments[categoryKey] || [];
              pathSegments[categoryKey]
                  .push(item);
            } else {
              queryParams[categoryKey] = queryParams[categoryKey] || [];
              queryParams[categoryKey]
                  .push(item);
            }
          });

      return { pathSegments, queryParams };
    },

    findCategoryKeyBySelectedItem(itemKey, categories, parentKey = null) {
      let result = categories
          .reduce((acc, category) => {
        if (acc) return acc;

        if (category.items && category.items
            .some(item => item.key === itemKey)) {
          return { categoryKey: category.key, parentKey };
        }

        let matchingSubCategories = category.subCategories
            ?.filter(subCategory => subCategory.items && subCategory.items
                    .some(item => item.key === itemKey)
        );

        if (matchingSubCategories && matchingSubCategories.length > 0) {
          let subCategory = matchingSubCategories[0];
          return { categoryKey: subCategory.key, parentKey: category.key };
        }
        return acc;
      }, null);

      return result || { categoryKey: null, parentKey };
    },

    processFilterParams(pathSegments, queryParams) {
      let parameters = {};
      let segments = {};

      for (const [key, value] of Object
          .entries(pathSegments)) {
        if (value.length > 1) {
          parameters[key] = value
              .join(',');
        } else {
          segments[key] = value[0];
        }
      }

      for (const [key, value] of Object
          .entries(queryParams)) {
        if (key === 'collections') {
          if (value.length > 0) {
            segments[key] = value[0];
          }
        } else if(key) {
          parameters[key] = value
              .join(',');
        }
      }
      return {segments, parameters} ;
    },

    updateRoute(segments, parameters) {
      let pathSegments = [];

      if (segments.categories) {
        pathSegments.push(`${segments.categories}`);
      }

      if (segments.collections) {
        pathSegments.push(`${segments.collections}`);
      }

      pathSegments = [...new Set(pathSegments)];

      const path = pathSegments.length > 0 ? `/catalog/${pathSegments.join('/')}/` : '/catalog/';

      this.$router.push({ path, query: parameters });
    },
  },
});
</script>

<style lang="scss">
ul{
  list-style: none;
}
.categories__subcategories {
  margin-left: 1rem;
}
</style>