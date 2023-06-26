<template>
  <div class="card-container d-flex flex-column" @mouseleave="closeEdits()" @mouseenter="openEdits()">

    <div class="card-info" @click="openEdits()">
      <div class="col-12 d-flex align-items-center gap-3 fs-2 fw-medium">
        <img :src="food.photo" alt="">
        <p>{{ food.name }}</p>
      </div>
      <div>
        <p>serving unit: <span class="fw-bold">{{ food.unit }}</span></p>
      </div>
    </div>
      
    <div class="card-edit d-flex flex-row justify-content-between" :class="{active: expanded}">
      <button :disabled="!food.quantity >= 1" 
        @click="changePantryQty(-1, food.foodItemId)"
        class="btn btn-subtraction flex-grow-1">
        <i class="mdi mdi-minus"></i> 1
      </button>
      <div class="edit-quantity d-flex flex-column justify-content-center text-center">
        qty: {{ food.quantity }}
      </div> 
      <button @click="changePantryQty(1, food.foodItemId)" 
        class="btn btn-addition flex-grow-1">
        <i class="mdi mdi-plus"></i> 1
      </button>
    </div>

  </div>
</template>
  
<script>
import { computed, ref } from 'vue'
import { NutritionixFoodItem } from '../models/NutritionixFoodItem'
import { pantryService } from '../services/PantryService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
  export default {
    props:{
      food: { type: NutritionixFoodItem, required: true }
    },
    setup() {
      let expanded = ref(false)
      return {
        expanded,
        foodList: computed(() => AppState.foodList),
        pantry: computed(() => AppState.pantry),

      async changePantryQty(value, foodItemId) {
        try { pantryService.changePantryQty(value, foodItemId) } 
        catch (error) {
          logger.log(error, `couldn't add or subtract food`)
          Pop.error(error)
        }
      },

      openEdits(){ expanded.value = true },
      closeEdits(){ expanded.value = false },

      }
    }
  }
</script>

<style scoped>
.card-container{
  width: 100%;
  margin-bottom: 0.5rem;
}
.card-info{
  cursor: pointer;
  border-radius: 0.4rem 0.4rem 0 0;
  /* background-color: white; */
  overflow: hidden;
}
.card-edit{
  background-color: white;
  height: 0;
  overflow: hidden;
  transition: all 200ms ease-in-out;
  border-radius: 0 0 0.4rem 0.4rem;
}
.active{
  height: 4rem;
  padding: 0.25rem;
}
.btn-addition{
  background-color: green;
  border: 0;
  border-radius: 0 0.5rem 0.5rem 0;
}
.btn-subtraction{
  background-color: tomato;
  border: 0;
  border-radius: 0.5rem 0 0 0.5rem;
}
p {
  margin: 0
}

img {
  height: 3rem;
  aspect-ratio: 1/1;
}
</style>