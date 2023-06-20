<template>
  <div class="col-12" v-if="activeRecipe">
    <div class="active-recipe-card">
      <div class="recipe-img d-flex flex-column justify-content-end" v-bind:style='{ backgroundImage: "url(" + activeRecipe.image + ")", }'>
        <div class="content-fade"> <!-- This is the fade element --> </div>
      </div>
      
      <div class="title text-center">
        <h2 class="oswald">
          {{ activeRecipe.name }}
        </h2>
      </div>

      <div class="ingredients d-flex flex-row flex-wrap">
        <div v-for="i in activeRecipe.ingredients" :key="i.name" class="ingredient-pill">
          <div :title="i.original">
            {{ i.amount }} {{ i.unitUs }} {{ i.name }}
          </div>
        </div>
      </div>
      
      <br/>
      
      <div v-html="activeRecipe.summary" class="recipe-summary"></div>

      <br/>

      <div class="instructions">
        <div v-for="s in activeRecipe.steps" :key="s.number">
          {{ s.number }}: {{ s.step }} <br/>
        </div>
      </div>
    
    </div>
  </div>
</template>
  
<script>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { recipesService } from '../services/RecipesService'
import { AppState } from '../AppState'
  export default {
    setup() {
      const route = useRoute().params.id

      async function getActiveRecipeFromApi(route){
        try {
          if(AppState.activeRecipe){return}
          await recipesService.getActiveRecipeFromApi(route)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      }

      onMounted(()=>{
        getActiveRecipeFromApi(route)
      })
      onUnmounted(()=>{
        AppState.activeRecipe = null
      })
      return {
        activeRecipe: computed(() => AppState?.activeRecipe)
      }
    }
  }
</script>

<style scoped>
.oswald{
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
}
h2{
  font-size: 2.3rem;
}
.active-recipe-card{
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
}
.recipe-img{
  width: 100%;
  height: 45vh;
  min-height: 9rem;
  max-height: 25rem;
  background-position: 50%;
  background-size: cover;
}
.content-fade {
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 12%, rgba(255, 255, 255, 0) 100%);
  height: 16%;
  margin-bottom: -2px;
}
.ingredient-pill{
  background-color: #D9D9D9;
  padding: 0.5rem 1.2rem;
  text-transform: capitalize;
  margin: 0.25rem;
  border-radius: 1000rem;
}
</style>