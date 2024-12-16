<template>
  <div>
    <h1>Product Filters</h1>
    <div v-for="(category, categoryIndex) in categoriesFilters" :key="category.key" class="category">
      <div class="items">
        <ul>
          <li v-for="item in category.items" v-if="categoryIndex < 3" :key="item.key">
            <input type="checkbox" :id="item.key" :value="item.key" :checked="item.isChecked" v-model="selectedItems" @change="handleCheckboxChange(item.key, categoryIndex, 'parent')" />
            <label :for="item.key">{{ item.key }}</label>
          </li>
        </ul>
      </div>
      <div class="subcategories" v-if="category.subCategories">
        <div v-for="subCategory in category.subCategories" :key="subCategory.key">
          <ul class="ml-4">
            <li v-for="subItem in subCategory.items" :key="subItem.key">
              <input type="checkbox" :id="subItem.key" :value="subItem.key" :checked="subCategory.isChecked" v-model="selectedItems" @change="handleCheckboxChange(subItem.key, categoryIndex, 'subcategory')" />
              <label :for="subItem.key">{{ subItem.key }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <h2>Selected Items:</h2>
      <ul>
        <li v-for="key in selectedItems" :key="key">{{ key }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({

  data() {
    return {
      selectedItems: [],
      categoriesFilters: this.$filtersStore.categoriesFilters
    };
  },

  mounted() {
    if(typeof this.$route.params.category !== "undefined")
    {
      this.selectedItems.push(this.$route.params.category);
    }

    if(typeof this.$route.params.collection !== "undefined")
    {
      this.selectedItems.push(this.$route.params.collection);
    }

    Object.values(this.$route.query).forEach(value => {
      this.selectedItems.push(...value.split(','));
    });
  },

  methods: {
    handleCheckboxChange(itemKey, categoryIndex, type) {

      if (type === "parent") {
        this.updateParentCategory(categoryIndex);
      } else if (type === "subcategory") {
        this.updateParentOnSubcategoryChange(categoryIndex);
      }

      const { pathSegments, queryParams } = this.createFilterParams();
      const { segments, parameters } = this.processFilterParams(pathSegments, queryParams);

      this.updateRoute(segments, parameters);
    },

    updateParentCategory(categoryIndex) {
      const category = this.categoriesFilters[categoryIndex];
      const isParentChecked = this.selectedItems.includes(category.items[0].key);

      if (isParentChecked) {
        this.selectAllSubcategories(category);
      } else {
        this.deselectAllSubcategories(category);
      }

      this.selectedItems = [...new Set(this.selectedItems)];
    },

    selectAllSubcategories(category) {

      if (category.items) {
        category.items.forEach((item) => {
          if (!this.selectedItems.includes(item.key)) {
            this.selectedItems.push(item.key);
          }
        });
      }

      if (category.subCategories) {
        category.subCategories.forEach((subCategory) => {
          subCategory.items.forEach((subItem) => {
            if (!this.selectedItems.includes(subItem.key)) {
              this.selectedItems.push(subItem.key);
            }
          });
        });
      }
    },

    deselectAllSubcategories(category) {

      if (category.items) {
        category.items.forEach((item) => {
          this.selectedItems = this.selectedItems.filter(
              (selected) => selected !== item.key
          );
        });
      }

      if (category.subCategories) {
        category.subCategories.forEach((subCategory) => {
          subCategory.items.forEach((subItem) => {
            this.selectedItems = this.selectedItems.filter(
                (selected) => selected !== subItem.key
            );
          });
        });
      }
    },

    updateParentOnSubcategoryChange(categoryIndex) {
      const category = this.categoriesFilters[categoryIndex];

      let isAnySubcategoryChecked = false;
      if (category.subCategories) {
        isAnySubcategoryChecked = category.subCategories.some((subCategory) =>
            subCategory.items.some((subItem) =>
                this.selectedItems.includes(subItem.key)
            )
        );
      }

      if (isAnySubcategoryChecked) {
        if (!this.selectedItems.includes(category.items[0].key)) {
          this.selectedItems.push(category.items[0].key);
        }
      } else {
        this.selectedItems = this.selectedItems.filter(
          (selected) => selected !== category.items[0].key
        );
      }
    },

    createFilterParams() {
      const pathSegments = {};
      const queryParams = {};

      this.selectedItems.forEach(item => {
        const { categoryKey, parentKey } = this.findCategoryKeyBySelectedItem(item, this.categoriesFilters);

        if (!categoryKey.includes("categories") && !categoryKey.includes("collections")) {
          queryParams[categoryKey] = queryParams[categoryKey] || [];
          queryParams[categoryKey].push(item);
        } else {
          pathSegments[categoryKey] = pathSegments[categoryKey] || [];
          pathSegments[categoryKey].push(item);
        }

      });

      return { pathSegments, queryParams };
    },

    findCategoryKeyBySelectedItem(itemKey, categories, parentKey = null) {
      for (const category of categories) {
        if (category.items && category.items.some(item => item.key === itemKey)) {
          return { categoryKey: category.key, parentKey };
        }
        else if (category.subCategories) {
          const matchingSubCategories = category.subCategories.filter(subCategory =>
              subCategory.items && subCategory.items.some(item => item.key === itemKey)
          );
          if (matchingSubCategories.length > 0) {
            const subCategory = matchingSubCategories[0];
            return { categoryKey: subCategory.key, parentKey: category.key};
          }
        }
      }

      return { categoryKey: null, parentKey };
    },

    processFilterParams(pathSegments, queryParams) {
      const parameters = {};
      const segments = {};

      for (const [key, value] of Object.entries(pathSegments)) {
        if (value.length > 1) {
          parameters[key] = value.join(',');
        } else {
          segments[key] = value[0];
        }
      }

      for (const [key, value] of Object.entries(queryParams)) {
        if (key === "collections") {
          if (value.length > 0) {
            segments[key] = value[0];
          }
        } else if(key) {
          parameters[key] = value.join(',');
        }
      }
      return {segments, parameters} ;
    },

    updateRoute(segments, parameters) {

      const pathSegments = [];

      if (segments.categories) {
        pathSegments.push(`${segments.categories}`);
      }
      if (segments.collections) {
        pathSegments.push(`${segments.collections}`);
      }
      const path = pathSegments.length > 0 ? `/catalog/${pathSegments.join('/')}/` : '/catalog/';

      this.$router.push({ path, query: parameters });
    },
  },

});
</script>

<style scoped>
ul{
  list-style: none;
}
.subcategories {
  margin-left: 1rem;
}
</style>