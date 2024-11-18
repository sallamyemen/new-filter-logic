<template>
  <div>
    <h1>Product Filters</h1>
    <div v-for="category in categoriesFilters" :key="category.key" class="category">
      <div class="items">
        <ul>
          <li v-for="item in category.items" :key="item.key">
            <input type="checkbox" :id="item.key" :value="item.key" v-model="selectedItems" @change="onCheckboxChange(item.key)" />
            <label :for="item.key">{{ item.key }}</label>
          </li>
        </ul>
      </div>
      <div class="subcategories" v-if="category.subCategories">
        <div v-for="subCategory in category.subCategories" :key="subCategory.key">
          <ul class="ml-4">
            <li v-for="subItem in subCategory.items" :key="subItem.key">
              <input type="checkbox" :id="subItem.key" :value="subItem.key" v-model="selectedItems" @change="onCheckboxChange(subItem.key)" />
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

  methods: {
    onCheckboxChange(itemKey) {
      // const { categoryKey, parentKey, parentItem } = this.findCategoryKey(itemKey, this.categoriesFilters);

      // if (parentItem) {
      //   // Toggle the parent checkbox when a subcategory item is checked/unchecked
      //   this.toggleParentsStatus(parentItem);
      // }

      const { pathSegments, queryParams } = this.createFilterParams();
      const { segments, parameters } = this.processFilterParams(pathSegments, queryParams);
      // console.log('parameters', parameters);
      // console.log('segments', segments);
      this.updateRoute(segments, parameters);
    },

    createFilterParams() {
      const pathSegments = {};
      const queryParams = {};

      this.selectedItems.forEach(item => {
        const { categoryKey, parentKey, parentItem } = this.findCategoryKey(item, this.categoriesFilters);

        // if (categoryKey) {
        //   console.log(`category Key for ${item}:`, categoryKey);
        //   if (parentKey) {
        //     console.log(`Parent Key for ${item}:`, parentKey);
        //   }
        // }

        if(parentItem){
          console.log(`Parent Item Key for ${item}:`, parentItem);
          this.toggleParentsStatus(parentItem);
        }

        if (!categoryKey.includes("category") && !categoryKey.includes("collection")) {
          queryParams[categoryKey] = queryParams[categoryKey] || [];
          queryParams[categoryKey].push(item);
        } else{
          pathSegments[categoryKey] = pathSegments[categoryKey] || [];
          pathSegments[categoryKey].push(item);
        }

        // console.log('queryParams', queryParams);
        // console.log('pathSegments', pathSegments);
      });

      return { pathSegments, queryParams };
    },

    findCategoryKey(itemKey, categories, parentKey = null, parentItem = null) {
      for (const category of categories) {
        if (category.items && category.items.some(item => item.key === itemKey)) {
          return { categoryKey: category.key, parentKey, parentItem };
        }
        else if (category.subCategories) {
          const matchingSubCategories = category.subCategories.filter(subCategory =>
              subCategory.items && subCategory.items.some(item => item.key === itemKey)
          );
          if (matchingSubCategories.length > 0) {
            const subCategory = matchingSubCategories[0];
            return { categoryKey: subCategory.key, parentKey: category.key, parentItem: category.items[0].key };
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
        if (key === "collection") {
          if (value.length >= 0) {
            segments[key] = value[0];
          }
        } else {

          parameters[key] = value.join(',');
        }
      }
      return {segments, parameters} ;
    },

    toggleParentsStatus(parentItem) {

      if (parentItem.isChecked) {

        if (!this.selectedItems.includes(parentItem.key)) {
          this.selectedItems.push(parentItem.key);
          console.log('Add parent to selectedItems', this.selectedItems);
        }
      } else {

        const index = this.selectedItems.indexOf(parentItem.key);
        if (index > -1) {
          this.selectedItems.splice(index, 1);
          console.log('Remove parent from selectedItems', this.selectedItems);
        }
      }
    },

    updateRoute(segments, parameters) {

      const pathSegments = [];

      if (segments.category) {
        pathSegments.push(`category-${segments.category}`);
      }
      if (segments.collection) {
        pathSegments.push(`collection-${segments.collection}`);
      }
      const path = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/catalog';

      // console.log('path', path);
      // console.log('parameters', parameters);

      // this.$router.push({ path, query: parameters });
    }

  }

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