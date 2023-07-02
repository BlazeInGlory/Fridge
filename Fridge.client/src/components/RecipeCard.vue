<template>
  <router-link class="txt-cs-black" :to="{ name: 'ActiveRecipe', params: { id: recipe.id } }" :title="recipe.name">

    <div 
    class="bg-cs-white wid-100 recipe-card d-flex flex-column justify-content-between" 
    v-bind:style='{ backgroundImage: "url(" + recipe.image + ")", }'
    >

      <div class="wid-100 fw-600 text-uppercase text-center pad-025 near-exp oswald">
        <!-- TODO set up functions to calculate missing ingredients -->
        Missing X Ingredients
      </div>

      <div class="d-flex flex-row flex-grow-1 wid-100 justify-content-end align-items-start">

        <div class="icons-container d-flex flex-column justify-content-center align-items-center text-center pad-05">
            <div class="icon"
            v-if="recipe.vegetarian && !recipe.vegan">
              <img src="../assets/img/icons/vegetarian.svg" alt="Vegetarian">
            </div>
            
            <div class="icon"
            v-if="recipe.vegan">
              <img src="../assets/img/icons/vegan.svg" alt="Vegan">
            </div>
            
            <div class="icon"
            v-if="recipe.glutenFree">
              <img src="../assets/img/icons/gluten_free.svg" alt="Gluten Free">
            </div>

            <div class="icon"
            v-if="recipe.dairyFree">
              <img src="../assets/img/icons/dairy_free.svg" alt="Dairy Free">
            </div>

            <div class="icon"
            v-if="recipe.lowCarb">
              <img src="../assets/img/icons/low_carb.svg" alt="Low Carb">
            </div>
        </div>

        <div v-if="isActiveSelection.favorites != ''" class="d-flex justify-content-start">
          <button @click="deleteFavorite(recipe.id)" class="btn btn-danger mdi mdi-delete d-flex"></button>
        </div>

      </div>

      <div class="content wid-100 d-flex flex-column">
        <div class="content-fade"> <!-- This is the fade element --> </div>
        <div class="wid-100 pad-y-075 pad-x-05 d-flex text-center flex-column bg-cs-white flex-grow-1 justify-content-center">
          
          <h3 class="oswald txt-cs-black fw-600">
            {{ recipe.name }}
          </h3>

        </div>
      </div>
    </div>

  </router-link>
</template>
  
<script>
import { computed } from "vue";
import { Recipe } from '../models/Recipe'
import { recipesService } from "../services/RecipesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
export default {
  props: {
    recipe: { type: Recipe, required: true }
  },
  setup() {
    return {
      isActiveSelection: computed(() => AppState.activeSelection),
      async deleteFavorite(recipeId) {
        try {
          await recipesService.deleteFavorite(recipeId)
        } catch (error) {
          logger.log(error, 'deleting recipe')
          Pop.error(error, 'deleting recipe')
        }
      }

    }
  }
}
</script>

<style scoped>
.recipe-card {
  background-size: cover;
  background-position: 50%;
  min-height: 20rem;
  border-radius: 1rem;
  align-items: center;
  overflow: hidden;
}
.content{
  min-height: 33%;
}
.icon img{
  height: 2.3rem;
  aspect-ratio: 1/1;
  margin: 0.2rem 0.1rem;
}
</style>