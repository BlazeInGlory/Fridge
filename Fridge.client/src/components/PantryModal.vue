<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Food Search</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <section class="row">
          <FoodSearchBar />
        </section>
        <section class="row my-2 elevation-3" v-for="f in foodList" :key="f.id">
          <div class="col-12 d-flex align-items-center gap-3 fs-2 fw-medium">
            <img :src="f.photo.thumb" alt="">
            <p>{{ f.food_name }}</p>
          </div>
          <div>
            <p>serving unit: <span class="fw-bold">{{ servingUnit }}</span></p>
          </div>
        </section>
      </div>
      <div class="modal-footer">
        <!-- NOTE do not need buttons -->
        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  props: {

  },
  setup() {
    // let allUnits = []
    // AppState.foodList.forEach(f => allUnits += f.serving_unit)
    // let servingUnit = allUnits.split(',')


    return {
      // servingUnit,
      foodList: computed(() => AppState.foodList),
      // servingUnit: computed(() => AppState.foodList.forEach(f => str = f.serving_unit.split(',')))
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