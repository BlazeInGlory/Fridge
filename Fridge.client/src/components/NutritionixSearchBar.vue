<template>
  <form @submit.prevent="searchFood()" class="d-flex flex-row flex-wrap">
    <div class="ht-100 d-flex flex-column justify-content-center wid-100">
      <input class="search-bar" 
      type="text" 
      v-model="search" 
      placeholder="banana..."
      id="nutritionixSearchBarHTM"
      >
    </div>
    <button type="submit" class="search-button">
      <i class="mdi mdi-magnify"></i>
    </button>
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
import { AppState } from '../AppState.js';

export default {
  setup() {
    const search = ref('')
    return {
      search,
      async searchFood() {
        try {
          const searchTerm = search.value
          if(AppState.logging){logger.log('searching foods', searchTerm)}
          if(searchTerm == ''){
            return
          }
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
.search-button{
    width: 3rem;
    margin-left: -3rem;
    border: 0;
    background: none;
    display: flex;
    flex-direction: column;
    line-height: 1;
    justify-content: center;
    align-items: flex-end;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0 0.75rem;
}
</style>