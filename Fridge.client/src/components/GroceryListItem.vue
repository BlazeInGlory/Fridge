<template>
    <div
    :class="{cart: foodItem.inCart == true}" 
    class="
    list-card 
    d-flex 
    flex-row 
    justify-content-between">
        <div class="description" 
        @click="addToCart(foodItem.id)"
        >
            <h3>
                {{ foodItem.name }}
            </h3>
            <p>
                Pantry: {{ foodItem.quantity }}
            </p>
        </div>
        <div class="qty">
            <h3>
                x{{ foodItem.shoppingQty }}
            </h3>
            <div class="delete" @click="deleteThisFoodForever(foodItem.id)">
                <i class="mdi mdi-trash-can"></i>
            </div>
        </div>
    </div>
</template>
  
<script>
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
      return {
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
        // TODO This is how we are going to add in the delete swipe, which we will use instead of Pop for user ease
        // However I haven't figured out how these work yet so for now I just put in a trash can

        // @touchstart="swipe1()" 
        // @touchend="swipe2()"

        // swipe1(event){
        //     logger.log('swipe1')
        // },
        // swipe2(){
        //     logger.log('swipe2')
        // }
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
    /* padding: 0.75rem; */
    overflow: hidden;
    margin: 0.15rem;
    cursor: pointer;
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
.delete{
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    background-color: rgb(240, 123, 117);
    color: black;
    font-size: 3rem;
    line-height: 0.5;
    height: 100%;
    overflow: hidden;
    /* width: 0px;
    padding: 0; */
    width: 80px;
    padding: 0.75rem;
    transition: all 300ms;
}
/* .list-card:active .delete{
    width: 80px;
    padding: 0.75rem;
} */
</style>