<template>
  <div class="pantry-card" 
  v-bind:style='{ backgroundImage: "url(" + food.photo + ")", }' 
  @mouseenter="closeStorageOptions(), getDetails(food.id)"
  >

    <div class="standard d-flex justify-content-between flex-column">
      <div class="notice">
        
        <!-- NOTE this is where the freshness value is displayed -->
        <div v-if="food.freshOverride || isFresh(food.storageType, food.lastIncreased) == 'fresh'" class="notifications-standard fresh oswald"> FRESH </div>
        <div v-else-if="isFresh(food.storageType, food.updatedAt) == 'near'" class="notifications-standard warn oswald"> NEAR EXPIRATION </div>
        <div v-else class="notifications-standard spoil oswald"> WARNING </div>

      </div>
      <div class="content">
        <!-- TODO set up 95% opacity on the main style that doesn't break everything-->
        <div class="content-fade"> <!-- This is the fade element --> </div>
        <div class="info d-flex flex-column justify-content-between">

          <div class="name">
            <h3 class="p-0 m-0"> {{ food.name }} </h3>
          </div>

          <div class="details d-flex flex-row justify-content-between">
            <div>
              <p>
                <i class="mdi mdi-ice-pop" v-if="food.storageType == 'Freezer'"></i>
                <i class="mdi mdi-fridge-industrial" v-if="food.storageType == 'Fridge'"></i>
                <i class="mdi mdi-countertop" v-if="food.storageType == 'Pantry'"></i>
                {{ food.storageType }}
              </p>
            </div>
            <div>x{{ food.quantity }} {{ food.unit }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="options">

        <div class="name">
          <h3 class="p-0 m-0"> {{ food.name }} </h3>
        </div>

        <div class="changeQty d-flex flex-row flex-grow-1 py-2">

          <button v-if="food.quantity > 0" @click="changePantryQty(-1, food.foodItemId)"
          class="subtract flex-grow-1 qty-btn">
            <i class="mdi mdi-minus"></i>
          </button>

          <div class="flex-grow-1 flex-column d-flex justify-content-center text-center center-edits">
              <div class="d-flex flex-column flex-grow-1">
                <h3 class="m-0"> {{ food.quantity }} </h3>
                <p class="m-0"> {{ food.unit }} </p>
              </div>
              <div class="flex-grow-1 d-flex flex-column storage-shift" @click="openStorageOptions()">
                <i class="mdi mdi-ice-pop" v-if="food.storageType == 'Freezer'"></i>
                <i class="mdi mdi-fridge-industrial" v-if="food.storageType == 'Fridge'"></i>
                <i class="mdi mdi-countertop" v-if="food.storageType == 'Pantry'"></i>
              </div>
          </div>
          
          <button v-if="food.quantity < 100" @click="changePantryQty(1, food.foodItemId)"
          class="add flex-grow-1 qty-btn">
            <i class="mdi mdi-plus"></i>
          </button>
        </div>

      <button @click="deleteFood(food.id)" class="delete-btn warn oswald">discard</button>

      <div class="storage-container" v-if="storageOptionsOpen">
        <div class="fade-area flex-grow-1" @click="closeStorageOptions()"></div>
        <div class="storage-options d-flex flex-column align-items-start">

          <div class="storage-option" 
          :class="{active: storageTypeFridge == true}"
          @click="changeStorageOption(food.foodItemId, 'Fridge'),
          changeStorageOptionVariable('Fridge')">
          <i class="mdi mdi-fridge-industrial"></i>
            Refrigerator
          </div>
          
          <div class="storage-option"
          :class="{active: storageTypeFreezer == true}" 
          @click="changeStorageOption(food.foodItemId, 'Freezer'),
          changeStorageOptionVariable('Freezer')">
            <i class="mdi mdi-ice-pop"></i>
            Freezer
          </div>
          
          <div class="storage-option"
          :class="{active: storageTypePantry == true}" 
          @click="changeStorageOption(food.foodItemId, 'Pantry'),
          changeStorageOptionVariable('Pantry')">
            <i class="mdi mdi-countertop"></i>
            Pantry
          </div>
        
        </div>
      </div>

    </div>

  </div>
</template>
  
<script>
import { ref } from 'vue';
import { FoodItem } from '../models/FoodItem'
import { pantryService } from '../services/PantryService';
import { freshnessChecker } from '../utils/FreshnessChecker';
import { logger } from "../utils/Logger.js";
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
  props: {
    food: { type: FoodItem, required: true }
  },
  setup() {
    let editOptionsOpen = ref(false)
    let storageOptionsOpen = ref(false)

    let storageTypeFridge = ref(false)
    let storageTypePantry = ref(false)
    let storageTypeFreezer = ref(false)

    return {

      storageOptionsOpen,
      editOptionsOpen,
      storageTypeFridge,
      storageTypeFreezer,
      storageTypePantry,

      async deleteFood(foodId) {
        try { pantryService.archiveFood(foodId) } 
        catch (error) { Pop.error(error, 'issue deleting food') }
      },

      async changePantryQty(value, foodItemId) {
        try { pantryService.changePantryQty(value, foodItemId) } 
        catch (error) {
          logger.log(error, "couldn't add or subtract food")
          Pop.error(error)
        }
        if(value > 0){
          AppState.pantry.find(f=>f.foodItemId == foodItemId).freshOverride = true
        }
      },

      isFresh(storageType, dateUpdate){
        return freshnessChecker.isFresh(storageType, dateUpdate)
      },

      openStorageOptions(){
        storageOptionsOpen.value = true
      },

      closeStorageOptions(){
        storageOptionsOpen.value = false
      },

      changeStorageOption(foodItemId, type){
        let foundFood = AppState.pantry.find(f=> f.foodItemId == foodItemId)
        foundFood.storageType = type
        pantryService.changePantryQty(0, foodItemId)
      },

      changeStorageOptionVariable(type){
        if (type == 'Pantry'){
          storageTypeFreezer.value = false
          storageTypeFridge.value = false
          storageTypePantry.value = true
        }else if (type == 'Fridge'){
          storageTypeFreezer.value = false
          storageTypeFridge.value = true
          storageTypePantry.value = false
        }else if (type == 'Freezer'){
          storageTypeFreezer.value = true
          storageTypeFridge.value = false
          storageTypePantry.value = false
        }else{
          storageTypeFreezer.value = true
          storageTypeFridge.value = false
          storageTypePantry.value = false
        }
      },

      getDetails(id){
        let foundFood = AppState.pantry.find(f => f.id == id)
        logger.log('The located food in the appstate to match this card is:', foundFood)
        this.changeStorageOptionVariable(foundFood.storageType)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.oswald{
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
}
.name{
  text-transform: capitalize;
  color: black !important;
}
.pantry-card {
  background-color: white;
  border-radius: 1rem;
  background-size: cover;
  background-position: 50%;
  width: 100%;
  aspect-ratio: 24/25;
  overflow: hidden;
  padding: 0;
}
.standard {
  height: 100%;
  width: 100%;
  text-align: center;
  transition: all 300ms;
  margin: 0;
}
/* .content .content-fade {
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 12%, rgba(255, 255, 255, 0) 100%);
  height: 2rem;
  margin-bottom: -2px;
} */
.content .info {
  background-color: rgba(255, 255, 255, 1);
  text-align: left;
  padding: 0 0.2rem;
}
h3 {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
}
.options {
  height: 104%;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: #fff;
  padding: 4% 0 2% 0;
  margin: 0;
}
.pantry-card:hover .standard {
  margin-top: -106%;
}
.notifications-standard { padding: 0.1rem; }
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
.delete-btn{
  border: 0;
  margin: 0;
  width: 100%;
  padding: 5%;
  text-transform: uppercase;
  transition: all 100ms;
}
.delete-btn:hover{
  background-color: #eebb43;
}
.qty-btn {
    height: 100%;
    border: 0;
    margin: 0 0.15rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d5d5d5;
    transition: all 100ms;
}
.qty-btn.add:hover{
  background-color: #98FFC1;
  color: #005217;
}
.qty-btn.subtract:hover{
  background-color: #FF6262;
  color: #160000;
}
.details{
    text-align: right;
    font-weight: 700;
}
.storage-shift {
    background-color: #000000;
    border-radius: 0.5rem;
    text-align: center;
    justify-content: center;
    padding: 0.3rem;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    &:hover{
      background-color: #9f9f9f;
      color: black;
    }
  }
  @media screen and (min-width: 500px){
   .storage-shift{
    font-size: 2rem !important;
   } 
  }

  @media screen and (min-width: 350px){
   .storage-shift{
    font-size: 1.5rem !important;
   } 
  }
.center-edits{
  height: 100%;
}
.storage-container {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #0000004f;
    color: black;
    margin-top: -2.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.storage-options {
  height: 60%;
  background-color: white;
}
.storage-option{
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  width: 100%;
  flex-grow: 1;
  text-align: left;
  padding: 0 0.5rem;
  cursor: pointer;
}
.storage-option:hover{
  background-color: lightblue;
  color: #2c3841;
}
.active{
  background-color: lightblue;
  color: #2c3841;
}
</style>