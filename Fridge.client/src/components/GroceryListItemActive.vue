<template>
  <div
  :class="{cart: foodItem.inCart == true}" 
  class="
  list-card 
  d-flex 
  flex-row 
  justify-content-between"
  v-if="foodItem.shoppingQty > 0 || crossedOff" 
  @click="changePantryQty( foodItem.shoppingQty, foodItem.foodItemId)">
      <div class="description d-flex flex-column justify-content-center" >
          <h3>
              {{ foodItem.name }}
          </h3>
      </div>
      <div class="qty">
          <h3>
              x{{ foodItem.shoppingQty }}
          </h3>

          <div class="add" >
           <i class="mdi mdi-plus"></i>
          </div>

      </div>
      <div class="strikethrough" v-if="crossedOff">
        <!-- NOTE line through the element here -->
      </div>
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue'
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
    onUnmounted(()=>{
      crossedOff.value = false
    })
    return {
      crossedOff,
      addToCart(id){
          const foodItem = AppState.pantry.filter(f => f.id == id)
          foodItem[0].inCart = !foodItem.inCart
          foodItem[0].shoppingQty += 1
          logger.log(foodItem)
      },
      async deleteThisFoodForever(id){
          try {
              await pantryService.deleteThisFoodForever(id)
          } catch (error) {
              Pop.error(error)
              logger.log(error, '[GroceryListItem:deleteThisFoodForever(id)]')
          }
      },
      async changePantryQty(value, foodItemId) {
        if(crossedOff.value){ 
          return 
        }
        try { 
          pantryService.changePantryQty(value, foodItemId)
          let foundFood = AppState.pantry.find( f => f.foodItemId == foodItemId )
          foundFood.shoppingQty = 0
          crossedOff.value = true 
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
p{
  padding: 0;
  margin: 0.25rem 0;
}
h3{
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  padding: 0;
  margin: 0;
}
.list-card{
  background-color: white;
  border-radius: 2rem;
  overflow: hidden;
  margin: 0.15rem;
  cursor: pointer;
  position: relative;
}
.qty{
  height: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
}
.qty h3{
  margin-right: 0.75rem;
}
.cart{
  color: blueviolet;
}
.description{
  padding: 0.25rem 0.75rem;
  flex-grow: 1;
}
.add{
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  background-color: rgb(117, 240, 131);
  color: black;
  font-size: 3rem;
  line-height: 0.5;
  height: 100%;
  overflow: hidden;
  width: 80px;
  padding: 0.75rem;
  transition: all 300ms;
}
.strikethrough{
  position: absolute;
  width: 96%;
  margin: 0 2%;
  height: 12%;
  top: 46%;
  background-color: rgb(0, 0, 0);
  transition: all 200ms ease-in-out;
}
</style>