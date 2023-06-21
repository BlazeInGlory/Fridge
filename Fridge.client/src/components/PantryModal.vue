<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add to Pantry</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">

        <section class="row">
          <FoodSearchBar />
        </section>

        <section class="row my-2 elevation-3" v-for="f in foodList" :key="f.id">
          <div class="col-8">
            <div class="col-12 d-flex align-items-center gap-3 fs-2 fw-medium">
              <img :src="f.photo" alt="">
              <p>{{ f.name }}</p>
            </div>
            <div>
              <p>serving unit: <span class="fw-bold">{{ f.unit }}</span></p>
            </div>
          </div>
          <div class="col-4 d-flex flex-column justify-content-evenly">
            <button @click="changePantryQty(1, f.foodItemId)" class="btn btn-dark mdi mdi-plus">1</button>
            <button v-if="f.quantity >= 1" @click="changePantryQty(-1, f.foodItemId)"
              class="btn btn-danger mdi mdi-subtract">-1</button>
            <p class="fw-bold fs-5 text-center py-1">qty: {{ f.quantity }}</p>
          </div>
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
p {
  margin: 0
}

img {
  height: 3rem;
  aspect-ratio: 1/1;
}
</style>