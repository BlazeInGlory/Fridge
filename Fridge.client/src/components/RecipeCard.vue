<template>
  <div class="card">
    {{ recipe.name }}
  </div>
</template>
  
<script>
import { Recipe } from '../models/Recipe'
  export default {
    props:{
      recipe: {type: Recipe, required: true}
    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>

</style>