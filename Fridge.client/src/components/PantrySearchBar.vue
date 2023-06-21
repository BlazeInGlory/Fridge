<template>
  <div class="search-container d-flex flex-column justify-content-center">
    <input @input.prevent="searchPantry()" 
    type="text" 
    v-model="search" 
    placeholder="Search Pantry..." 
    id="pantrySearchBarHTM"
    class="search-bar">
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


<style lang="scss" scoped>
input{
  all: unset;
}
.search-container{
  height: 100%;
}
.search-bar{
  transition: all 200ms;
  border: solid 2px #d9d9d9;
  background-color: #d9d9d9;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.45rem;
}
.search-bar:focus{
  border: solid 2px rgb(255 202 75);
  background-color: rgb(255, 255, 255);
  outline: 0;
}
</style>