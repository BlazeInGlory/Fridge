<template>
  <div class="card p-3">
    {{ food.name }}
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

</style>