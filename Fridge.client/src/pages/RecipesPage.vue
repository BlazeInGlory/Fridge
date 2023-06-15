<template>
  <div class="container-fluid">
    <div v-if="apiRecipes" class="row">
      <div v-for="r in apiRecipes" :key="r.id" class="col-12 col-md-6 p-3">
        <RecipeCard :recipe="r"/>
      </div>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { recipesService } from '../services/RecipesService'
  export default {
    setup() {

      async function getRecipesFromSpoonacular(){
        if (AppState.spoonacularRecipes){
          return
        }
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
        getRecipesFromSpoonacular()
      })
      
      return {
        apiRecipes: computed(() => AppState?.spoonacularRecipes)
      }
    }
  }
</script>

<style scoped>

</style>