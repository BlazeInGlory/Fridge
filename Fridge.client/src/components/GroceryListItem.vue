<template>
    <div
    :class="{cart: foodItem.inCart == true}" 
    class="
    list-card 
    d-flex 
    flex-row 
    justify-content-between">
        <div class="description d-flex flex-column justify-content-center" 
        @click="addToCart(foodItem.id)"
        >
            <h3>
                {{ foodItem.name }}
            </h3>
        </div>
        <div class="qty d-flex flex-row">
            <div class="d-flex flex-column">
                <h3 p-0 m-0>
                    x{{ foodItem.shoppingQty }}
                </h3>
                <p p-0 m-0>
                    {{ foodItem.unit }}
                </p>
            </div>

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
            const foodItem = AppState.pantry.find(f => f.id == id)
            foodItem.inCart = true
            foodItem.shoppingQty++
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
p{
    padding: 0;
    margin: 0.25rem 0;
    line-height: 1;
}
h3{
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
    padding: 0;
    margin: 0;
    line-height: 1;
}
.list-card{
    background-color: white;
    /* border-radius: 2rem; */
    overflow: hidden;
    /* margin: 0.15rem; */
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
    width: 80px;
    padding: 0.75rem;
    transition: all 300ms;
}

</style>