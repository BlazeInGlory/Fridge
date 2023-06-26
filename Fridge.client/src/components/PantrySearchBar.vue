<template>
  <div class="ht-100 d-flex flex-column justify-content-center">
    <input @input.prevent="searchPantry()"
    class="search-bar"
    type="text" 
    v-model="search" 
    placeholder="Search Pantry..." 
    id="pantrySearchBarHTM"
    >
  </div>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { pantryService } from "../services/PantryService.js";

export default {
  setup() {
    const search = ref('')

    return {
      search,
      pantry: computed(() => AppState.pantry),

      async searchPantry() {
        // debugger
        if (!AppState?.pantry) {
          await pantryService.getMyPantry()
          AppState.filteredPantry = AppState.pantry
        } else {
          // await pantryService.getMyPantry()
          let newPantryList = []
          AppState.pantry.forEach(f => {
            if(f.name.toLowerCase().includes(search.value.toLowerCase())) {
              newPantryList.push(f)
              AppState.filteredPantry = newPantryList
            }
          })
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
// input{ all: unset; }
</style>