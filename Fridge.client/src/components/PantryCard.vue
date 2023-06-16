<template>
  <div class="pantry-card" 
  v-bind:style='{ backgroundImage: "url(" + food.photo + ")", }'>
  
    <div class="standard">
      <div class="notice">
        notices
      </div>
      <div class="content">
        {{ food.name }}
      </div>
    </div>
    
    <div class="options">
      <div class="notice">
        notices
      </div>
      <div class="content">
        {{ food.name }}
      </div>
    </div>
  
  </div>
</template>
  
<script>
import { FoodItem } from '../models/FoodItem'
  export default {
    props:{
      food: {type: FoodItem, required:true}
    },
    setup() {
      return {
  
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
.options{
  height: 104%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: purple;
  padding: 2%;
  margin: 0;
}
.pantry-card:hover .standard{
  margin-top: -106%;
}
</style>