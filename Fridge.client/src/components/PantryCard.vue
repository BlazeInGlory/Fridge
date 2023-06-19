<template>
  <div class="pantry-card" 
  v-bind:style='{ backgroundImage: "url(" + food.photo + ")", }'>
  
    <div class="standard">
      <div class="notice">
        <div class="notifications-standard fresh">
          FRESH
        </div>
        <!-- <div class="notifications-standard warn">
          NEAR EXPIRATION
        </div>
        <div class="notifications-standard spoil">
          WARNING
        </div> -->
      </div>
      <div class="content">
        <div class="content-fade"></div>
        <div class="text">
          <div class="name col-6">
            <h3 class="p-0 m-0">
              {{ food.name }}
            </h3>
            <p>
              <i class="mdi mdi-ice-pop" v-if="food.storageType == 'Freezer'"></i>
              <i class="mdi mdi-fridge-industrial" v-if="food.storageType == 'Fridge'"></i>
              <i class="mdi mdi-countertop" v-if="food.storageType == 'Pantry'"></i>
              {{ food.storageType }}
            </p>
          </div>
          <div class="quantity col-6">
            <p>qty: {{ food.quantity }}</p>
          </div>
          <div class="info">

          </div>
        </div>
      </div>
    </div>
    <!-- NOTE the format of these buttons are temporary! change them as you please but they should work -->
    <div class="options">
      <div class="notice">
        <p>notices</p>
        <button @click="deleteFood(food.id)" class="btn btn-dark">discard</button>
        <section class="row">
          <div class="col-6">
            <button v-if="food.quantity > 0" @click="addSubtractFood('subtract', food.foodItemId)" class="mdi mdi-minus btn btn-danger"></button>
          </div>
          <div class="col-6" >
            <button v-if="food.quantity < 100" @click="addSubtractFood('add', food.foodItemId)" class="mdi mdi-plus btn btn-success"></button>
          </div>
        </section>
      </div>
      <div class="content">
        <div class="name">
          {{ food.name }}
        </div>
        <div class="info">
          <h2>{{ food.quantity }}</h2>
        </div>
      </div>
    </div>
  
  </div>
</template>
  
<script>
import { FoodItem } from '../models/FoodItem'
import { pantryService } from '../services/PantryService';
import Pop from '../utils/Pop';
  export default {
    props:{
      food: {type: FoodItem, required:true}
    },
    setup() {
      return {
        async deleteFood(foodId) {
          try {
            pantryService.deleteThisFoodForever(foodId)
          } catch (error) {
            Pop.error(error, 'issue deleting food')
          }
        },

        async addSubtractFood(addOrSubtract, foodItemId) {
        try {
          // debugger
          await pantryService.addSubtractFood(addOrSubtract, foodItemId)
        } catch (error) {
          logger.log(error, 'couldnt add or subtract food')
          Pop.error(error)
        }
      }
  
      }
    }
  }
</script>

<style scoped>
.pantry-card{
  background-color: white;
  border-radius: 1rem ;
  background-size: cover;
  width: 100%;
  aspect-ratio: 24/25;
  overflow: hidden;
  padding: 0;
}
.standard{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: all 300ms;
  margin: 0;
}
.standard .content{
  height: 6rem;
}
.standard .content .content-fade{
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 12%, rgba(255,255,255,0) 100%);
  height: 2rem;
  margin-bottom: -2px;
}
.standard .content .text {
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.standard .content .text .name h3{
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
}
.options{
  height: 104%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: #fff;
  padding: 2%;
  margin: 0;
}
.pantry-card:hover .standard{
  margin-top: -106%;
}
.notifications-standard{
  padding: 0.1rem;
  font-size: 1rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
}
.fresh {
  background-color: #98FFC1;
  color: #005217;
}
.warn {
  background-color: #FFCA4B;
  color: #422C00;
}
.spoil {
  background-color: #FF6262;
  color: #160000;
}
</style>