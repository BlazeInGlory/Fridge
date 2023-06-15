<template>
  Recipe Page
</template>
  
<script>
import { onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { recipesService } from '../services/RecipesService'
  export default {
    setup() {

      async function getRecipesFromSpoonacular(){
        let ingredients = ''
        for (let i=0; i < AppState?.pantry.length; i++){
          ingredients += AppState.pantry[i].name + ', '
        }
        try {
          await recipesService.getRecipesFromSpoonacular(ingredients)
        } catch (error) {
          Pop.error(error)
          logger.log(error, '[RecipesPage:getRecipesFromSpoonacular()]')
        }      
      }
      
      onMounted(()=>{
        // getRecipesFromSpoonacular()
      })
      
      return {
  
      }
    }
  }
</script>

<style scoped>

</style>