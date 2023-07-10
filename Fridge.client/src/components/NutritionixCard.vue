<template>
  <div class="wid-100 d-flex flex-row justify-content-between pad-x-05 pad-y-05" @mouseleave="closeEdits()" @mouseenter="openEdits()">

    <div class="tran-300 card-info d-flex flex-row text-nowrap overflow-hidden wid-0" 
    @click="openEdits()"
    :class="{'flex-grow-1':!expanded}">
      <img :src="food.photo" :alt="food.name" class="unit-img">
      <div class="d-flex flex-column pad-x-05">
        <h5 class="m-1 lh-1 p-0 text-capitalize">{{ food.name }}</h5>
        <p class="m-1 lh-1 p-0">Unit: <span class="fw-bold">{{ food.unit }}</span></p>
      </div>
    </div>


    <div class="edits d-flex flex-row oswald fw-600 fs-1 align-items-center text-center justify-content-center lh-1 tran-300" 
    :class="{active: expanded}">

      <button :disabled="!food.quantity >= 1" 
        @click="changePantryQty(-1, food.foodItemId)"
        class="btn-subtraction spoil wid-0 text-nowrap tran-300 btn-base"
        :class="{'flex-grow-1': expanded}">
        <i class="mdi mdi-minus"></i>
      </button>

      <div class="flex-grow-1">
        {{ food.quantity }}
      </div>

      <button @click="changePantryQty(1, food.foodItemId)" 
        class="btn-addition fresh wid-0 text-nowrap tran-300 btn-base d-flex flex-column justify-content-center text-center"
        :class="{'flex-grow-1': expanded}">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
      
    <!-- <div class="card-edit bg-cs-white overflow-hidden tran-inout-300 d-flex flex-row justify-content-between" ">
      <button :disabled="!food.quantity >= 1" 
        @click="changePantryQty(-1, food.foodItemId)"
        class="btn btn-subtraction spoil flex-grow-1">
        <i class="mdi mdi-minus"></i> 1
      </button>
      <div class="edit-quantity d-flex flex-column justify-content-center text-center">
        qty: {{ food.quantity }}
      </div> 
      <button @click="changePantryQty(1, food.foodItemId)" 
        class="btn btn-addition fresh flex-grow-1">
        <i class="mdi mdi-plus"></i> 1
      </button>
    </div> -->

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
.unit-img{
  border-radius: 0.4rem;
}
.card-container{
  margin-bottom: 0.5rem;
}
.card-info{
  cursor: pointer;
}
.card-edit{
  height: 0;
  border-radius: 0 0 0.4rem 0.4rem;
}
.active{
  flex-grow: 1;
}
.btn-addition{
  border: 0;
  border-radius: 0.5rem;
}
.btn-subtraction{
  border: 0;
  border-radius: 0.5rem;
}
.btn-base{
  font-size: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  height: 3rem;
  aspect-ratio: 1/1;
}

.edits {
    background-color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
}
</style>