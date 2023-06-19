<template>
  <form @submit.prevent="searchPantry()">
    <div class="d-flex">
      <input type="text" v-model="search" placeholder="apple...">
    </div>
  </form>
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

      async searchPantry() {
        try {
          const searchTerm = search.value
          await pantryService.searchPantry(searchTerm)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message, 'ERROR getting food from pantry')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>