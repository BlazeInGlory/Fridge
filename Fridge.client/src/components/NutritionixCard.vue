<template>
  <div class="col-8">
            <div class="col-12 d-flex align-items-center gap-3 fs-2 fw-medium">
              <img :src="food.photo" alt="">
              <p>{{ food.name }}</p>
            </div>
            <div>
              <p>serving unit: <span class="fw-bold">{{ food.unit }}</span></p>
            </div>
          </div>
          <div class="col-4 d-flex flex-column justify-content-evenly">
            <button @click="changePantryQty(1, food.foodItemId)" class="btn btn-dark mdi mdi-plus">1</button>
            <button v-if="food.quantity >= 1" @click="changePantryQty(-1, food.foodItemId)"
              class="btn btn-danger mdi mdi-subtract">-1</button>
            <p class="fw-bold fs-5 text-center py-1">qty: {{ food.quantity }}</p>
          </div>
</template>
  
<script>
import { NutritionixFoodItem } from '../models/NutritionixFoodItem'
  export default {
    props:{
      food: { type: NutritionixFoodItem, required: true }
    },
    setup() {
      return {
  
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