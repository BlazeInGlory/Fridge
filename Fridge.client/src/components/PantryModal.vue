<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add to Pantry</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">

        <section class="row">
          <NutritionixSearchBar />
        </section>

        <section class="row my-2 elevation-3" v-for="f in foodList" :key="f.id">
          <NutritionixCard :food="f"/>
        </section>
        
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { pantryService } from "../services/PantryService.js"

export default {
  props: {

  },
  setup() {


    return {
      foodList: computed(() => AppState.foodList),
      pantry: computed(() => AppState.pantry),

      async changePantryQty(value, foodItemId) {
        try { pantryService.changePantryQty(value, foodItemId) } 
        catch (error) {
          logger.log(error, `couldn't add or subtract food`)
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>