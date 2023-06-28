<template>
  <div class="list-card bg-cs-white overflow-hidden d-flex flex-row justify-content-between" 
  v-if="foodItem.shoppingQty > 0 || crossedOff" 
  @click="changeLocalPantryQty( foodItem.shoppingQty, foodItem.foodItemId)"
  >
      <div class="description d-flex flex-column justify-content-center" >
          <h3 class="oswald fw-600 p-0 m-0 lh-1">
              {{ foodItem.name }}
          </h3>
      </div>
      <div class="qty pad-x-025 ht-100 d-flex flex-row justify-content-center align-items-center">
        <div class="d-flex flex-column pad-x-075">
          <h3 class="oswald fw-600 p-0 m-0 lh-1">
              x{{ foodItem.shoppingQty }}
          </h3>
          <p class="p-0 m-0">
              {{ foodItem.unit }}
          </p>
        </div>

        <!-- <div class="add fresh d-flex justify-content-center align-items-center ht-100 overflow-hidden tran-300 pad-075" >
          <i class="mdi mdi-plus"></i>
        </div> -->

      </div>
      <div class="strikethrough bg-cs-black tran-inout-300" v-if="crossedOff">
        <!-- NOTE line through the element here -->
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { AppState } from '../AppState'
import { FoodItem } from '../models/FoodItem'
import { pantryService } from '../services/PantryService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props:{
      foodItem: {type: FoodItem, required: true}
  },
  setup() {
    let crossedOff = ref(false)

    return {
      crossedOff,
      async changeLocalPantryQty(value, foodItemId) {
        if(crossedOff.value){
          await this.changeApiPantryQty((value*-1), foodItemId)
          crossedOff.value = false 
          return 
        }
        else{
          await this.changeApiPantryQty(value, foodItemId)
          crossedOff.value = true 
          return
        }
      },
      async changeApiPantryQty(value, foodItemId){
        try { 
          await pantryService.changePantryQty(value, foodItemId)
          let foundFood = AppState.pantry.find( f => f.foodItemId == foodItemId )
          foundFood.freshOverride = true
        }
         catch (error) {
          logger.error(error, "couldn't add or subtract food")
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.list-card{
  cursor: pointer;
  position: relative;
}
.description{
  padding: 0.25rem 0.75rem;
  flex-grow: 1;
}
.add{
  cursor: pointer;
  font-size: 3rem;
  line-height: 0.5;
  width: 80px;
}
.strikethrough{
  position: absolute;
  width: 99%;
  margin: 0 0.5%;
  height: 12%;
  top: 46%;
  left: 0%;
}
</style>