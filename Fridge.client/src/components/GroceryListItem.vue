<template>
    <div :class="{cart: foodItem.inCart == true}"
    class="bg-cs-white list-card overflow-hidden d-flex flex-column justify-content-between"
    @mouseleave="closeOptions()">
        <div class="d-flex flex-row justify-content-between wid-100">

            <!-- NOTE this is the div that holds the title -->
            <div
            :class="{'flex-grow-1': !optionsOpen}" 
            class="mar-l-075 d-flex flex-column justify-content-center tran-300 wid-0">
                <h3 class="oswald fw-600 p-0 m-0 text-capitalize list-title" v-text="calcName(foodItem.name)">
                </h3>
            </div>

            <!-- NOTE this is the container div to hold all the 
            logic for the options -->
            <div
            :class="{'flex-grow-1': optionsOpen}" 
            class="d-flex flex-row options-container justify-content-end" 
            >
                <!-- NOTE this is the signifier for open or closed on the options -->
                <div 
                class="pad-025 order-1 d-flex flex-column justify-content-center align-content-center arrow-container"
                @click="toggleOptions()" 
                >
                <div
                :class="{'arrow-closed': optionsOpen}" 
                class="arrow">
                </div>
                </div>

                <!-- NOTE this is the minus for the options -->
                <div
                :class="{'this-closed': !optionsOpen, 'this-open': optionsOpen}" 
                class="order-2 quant-button-container">
                    <div class="spoil quant-button"
                    @click="changeShoppingQuantity(-1, foodItem.id)"
                    >
                        <i class="mdi mdi-minus"></i>
                    </div>
                </div>
                
                <!-- NOTE this is the plus button for the options -->
                <div
                :class="{'this-closed': !optionsOpen, 'this-open': optionsOpen}" 
                class="order-4 quant-button-container"
                >
                    <div class="fresh quant-button"
                    @click="changeShoppingQuantity(1, foodItem.id)"
                    >
                    <i class="mdi mdi-plus"></i>
                
                    </div>
                </div>
        
                <!-- NOTE this holds the quantity that is always seen -->
                <div
                class="order-3 quant d-flex flex-row align-items-center justify-content-center"
                >
                    <div
                    title="Click for more options"
                    @click="openOptions()" 
                    class="d-flex flex-column pad-x-1"
                    >
                        <h3 class="oswald fw-600 pad-y-025 m-0 mar-r-075 lh-1">
                            x{{ foodItem.shoppingQty }}
                        </h3>
                        <p class="p-0 m-0 lh-1 text-end">
                            {{ foodItem.unit }}
                        </p>
                    </div>
                </div>

                <!-- NOTE this is the add to cart button -->
                <div class="order-5 button cart overflow-hidden ht-100 tran-300 pad-075 d-flex justify-content-center align-items-center" 
                v-if="!foodItem.inCart"
                @click="addOrRemoveFromCart(foodItem.id)">
                    <i class="mdi mdi-cart lh-1"></i>
                </div>
                
                <div class="order-5 button cart-delete overflow-hidden ht-100 tran-300 pad-075 d-flex justify-content-center align-items-center" 
                v-else
                @click="addOrRemoveFromCart(foodItem.id)">
                    <i class="mdi mdi-trash-can lh-1"></i>
                </div>
            </div>
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
        openOptions(){ optionsOpen.value = true },
        closeOptions(){ optionsOpen.value = false },
        toggleOptions(){ optionsOpen.value = !optionsOpen.value },
        findFood(id){
            return AppState.pantry.find(f => f.id == id)
        },
        addOrRemoveFromCart(id){
            const foodItem = this.findFood(id)
            foodItem.inCart = !foodItem.inCart
            logger.log(foodItem)
        },
        changeShoppingQuantity(value, id){
            const foodItem = this.findFood(id)
            foodItem.shoppingQty += value
            if(foodItem.shoppingQty<=0){
                foodItem.shoppingQty = 0
            }
        },
        async deleteThisFoodForever(id){
            try {
                await pantryService.deleteThisFoodForever(id)
            } catch (error) {
                Pop.error(error)
                logger.log(error, '[GroceryListItem:deleteThisFoodForever(id)]')
            }
        },
        calcName(name){
            return name
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
.cart{
    background-color: var(--rc-fresh);
    color: var(--rc-fresh-txt);
}
.cart-delete{
    background-color: var(--cs-black);
    color: var(--cs-white);
}
.cart-quant{
    background-color: var(--cs-black);
    color: var(--cs-white);
}
.button{
    cursor: pointer;
    font-size: 2.3rem;
    /* min-width: 80px; */
    border-left: solid 0.2rem var(--cs-black);
}
.quant{
    min-width: 65px;
    /* width: 100%; */
    max-width: 80px;
    cursor: pointer;
    flex-grow: 1;
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
.options-container{
    transition: all ease-out 200ms;
    height:5rem;
    border: solid 0.2rem var(--cs-black);
    border-radius: 0.5rem;
    background-color: var(--cs-white);
    overflow: hidden;
    z-index: 1;
}
.quant-button-container {
    transition: all 230ms;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 0;
}
.quant-button{
    width: 90%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
}
.list-title{
    min-width: max-content;
    width: -webkit-fill-available;
    text-overflow: clip;
}
.this-closed{
    width: 0;
}
.this-open{
    max-width: 100vw;
    flex-grow: 2;
}
.arrow-container{
    background-color: var(--cs-gray);
    border-right: solid 0.2rem var(--cs-black);

}
.arrow{
    height: 0.7rem;
    aspect-ratio: 1/1;
    border-left: solid black 0.2rem;
    border-top: solid black 0.2rem;
    transform: rotate(-45deg);
    transition: all 180ms;
    margin-left: 0.15rem;
    margin-right: 0;
}
.arrow-closed{
    transform: rotate(135deg);
    margin-left: 0;
    margin-right: 0.15rem;
}
</style>