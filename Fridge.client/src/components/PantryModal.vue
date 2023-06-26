<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h1 class="modal-title fs-5 oswald uppercase fw-600" id="exampleModalLabel">Add to Pantry</h1>
        <button type="button" data-bs-dismiss="modal"  class="btn-close" aria-label="Close"></button>
      </div>

      <div class="modal-body p-0">

        <section class="pad-05 wid-100">
          <NutritionixSearchBar />
        </section>

        <section class="" v-for="(f, index) in foodList" :key="f.id">
          <NutritionixCard :class="{'list-odd':index % 2 == 1}" :food="f"/>
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
      },
    }
  }
}
</script>

<style scoped>
.list-odd{
  background-color: #d5d5d5;
}
</style>