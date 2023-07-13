<template>

  <div :title="ingredient.original" class="ingredient-pill"
  :class="{'notInPantry':!found, 'inPantry':found}">
    {{ ingredient.amount }} {{ ingredient.unitUs }} {{ ingredient.name }}
  </div>

</template>
  
<script>
import { onMounted, ref } from 'vue'
import { Ingredient } from '../models/Ingredient'
import { ingredientsService } from '../services/IngredientsService'
import { logging } from '../utils/Logger'
  export default {
    props:{
      ingredient: {type: Ingredient, required: true}
    },

    setup(props) {
      let found = ref(false)
      let matches = ref([])

      function getMatched(name){
          logging.warn(`getMatches(${name})`)
        matches.value = ingredientsService.getMatchingIngredientsInPantry(name)
        if (matches.value.length > 0){
          found.value = true
        }
      }

      onMounted(()=>{
        getMatched(props.ingredient.name)
      })
      
      return {
        found,
        matches,
      }
    }
  }
</script>

<style scoped>
.ingredient-pill {
  background-color: var(--cs-gray);
  padding: 0.5rem 1.2rem;
  text-transform: capitalize;
  margin: 0.25rem;
  border-radius: 1000rem;
  border: 2px solid var(--cs-black);

}
.notInPantry{
  border: 2px solid var(--rc-spoil-txt);
  background-color: var(--rc-spoil);
  color: var(--rc-spoil-text);
}
.inPantry{
  border: 2px solid var(--rc-fresh-txt);
  background-color: var(--rc-fresh);
  color: var(--rc-fresh-text);
}
</style>