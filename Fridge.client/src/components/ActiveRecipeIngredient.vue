<template>
  <div :title="ingredient.original" class="ingredient-pill"
  :class="{'notInPantry':!found, 'inPantry':found}">
    {{ ingredient.amount }} {{ ingredient.unitUs }} {{ ingredient.name }}
  </div>
</template>
  
<script>
import { ref } from 'vue'
import { Ingredient } from '../models/Ingredient'
  export default {
    props:{
      ingredient: {type: Ingredient, required: true}
    },
    setup() {
      let found = ref(false)
      return {
        found,
      }
    }
  }
</script>

<style scoped>
.ingredient-pill {
  background-color: #D9D9D9;
  padding: 0.5rem 1.2rem;
  text-transform: capitalize;
  margin: 0.25rem;
  border-radius: 1000rem;
}
.notInPantry{
  border: 2px solid red;
}
.inPantry{
  border: 2px solid green;
}
</style>