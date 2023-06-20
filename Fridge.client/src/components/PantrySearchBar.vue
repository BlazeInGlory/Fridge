<template>
  <div class="d-flex">
    <input @input.prevent="searchPantry()" type="text" v-model="search" placeholder="Search Pantry..." id="pantrySearchBarHTM">
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

      // TODO each letter in the input will be compared to each letter in the pantry
      // async filteredList() {
      //   return await pantry.filter((food) => food.toLowerCase().includes(search.value.toLowerCase))
      // }

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


<style lang="scss" scoped></style>