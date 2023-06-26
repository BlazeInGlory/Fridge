<template>
    <div :class="{cart: foodItem.inCart == true}" class="bg-cs-white list-card overflow-hidden d-flex flex-column justify-content-between">
        <div class="d-flex flex-row justify-content-between wid-100">
            <div class="d-flex flex-row justify-content-between flex-grow-1"
            @click="openCloseOptions()">
                <div class="pad-y-025 pad-x-075 d-flex flex-column justify-content-center flex-grow-1">
                    <h3 class="oswald fw-600 p-0 m-0 text-capitalize">
                        {{ foodItem.name }}
                    </h3>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center">
                    <div class="d-flex flex-column pad-x-1">
                        <h3 class="oswald fw-600 pad-y-025 m-0 mar-r-075 lh-1">
                            x{{ foodItem.shoppingQty }}
                        </h3>
                        <p class="p-0 m-0 lh-1 text-end">
                            {{ foodItem.unit }}
                        </p>
                    </div>
                    
                </div>
            </div>
            
            <div class="button overflow-hidden ht-100 tran-300 fresh pad-075 d-flex justify-content-center align-items-center" 
            v-if="!foodItem.inCart"
            @click="addOrRemoveFromCart(foodItem.id)">
                <i class="mdi mdi-cart lh-1"></i>
            </div>
            
            <div class="button cs-black overflow-hidden ht-100 tran-300 pad-075 d-flex justify-content-center align-items-center" 
            v-else
            @click="addOrRemoveFromCart(foodItem.id)">
                <i class="mdi mdi-trash-can lh-1"></i>
            </div>
        </div>
        <div v-if="optionsOpen">
            options open
        </div>
        <div v-else>
            options closed
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
        let optionsOpen = ref(false)

      return {
        optionsOpen,
        openCloseOptions(){
            optionsOpen.value = !optionsOpen.value
        },
        findFood(id){
            return AppState.pantry.find(f => f.id == id)
        },
        addOrRemoveFromCart(id){
            const foodItem = this.findFood(id)
            foodItem.inCart = !foodItem.inCart
            // foodItem.shoppingQty++
            logger.log(foodItem)
        },
        async deleteThisFoodForever(id){
            try {
                await pantryService.deleteThisFoodForever(id)
            } catch (error) {
                Pop.error(error)
                logger.log(error, '[GroceryListItem:deleteThisFoodForever(id)]')
            }
        }
      }
    }
  }
</script>

<style scoped>
/* @import "../assets/scss/_variables.scss"; */
.list-card{
    transition: all 200ms;
    cursor: pointer;
}
.button{
    cursor: pointer;
    font-size: 3rem;
    width: 80px;
    border-radius: 0.5rem;
    border-width: 0.2rem;
    border-style: solid;
}
.cart{
    background-color: var(--cs-green-lt);
    color: var(--rc-fresh-txt);
}
.list-odd{
    background-color: var(--cs-gray);
    color: var(--cs-black);
}
.cart.list-odd{
    background-color: var(--cs-green);
    color: var(--rc-fresh-txt);
}
</style>