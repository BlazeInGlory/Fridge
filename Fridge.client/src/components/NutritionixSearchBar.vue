<template>
  <form @submit.prevent="searchFood()">
    <div class="ht-100 d-flex flex-column justify-content-center">
      <input class="search-bar" 
      type="text" 
      v-model="search" 
      placeholder="banana..."
      id="nutritionixSearchBarHTM"
      >
    </div>
  </form>
  <!-- <section class="row">
    <div class="col-12">

    </div>
  </section> -->
</template>


<script>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { pantryService } from "../services/PantryService.js";

export default {
  setup() {
    const search = ref('')
    return {
      search,
      async searchFood() {
        try {
          const searchTerm = search.value
          // logger.log('searching foods', searchTerm)
          await pantryService.searchFood(searchTerm)
        } catch (error) {
          logger.error(error, 'searching foods')
          Pop.error(error.message, 'ERROR getting foods')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>