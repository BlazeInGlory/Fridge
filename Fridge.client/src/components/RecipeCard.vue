<template>
  <router-link class="txt-cs-black" :to="{ name: 'ActiveRecipe', params: { id: recipe.id } }" :title="recipe.name">
    <div class="bg-cs-white wid-100 recipe-card d-flex flex-column justify-content-between" v-bind:style='{ backgroundImage: "url(" + recipe.image + ")", }'>
      <div class="wid-100 fw-600 text-uppercase text-center pad-025 near-exp oswald">
        Missing {{ recipe.missingIngredients.length }} Ingredients
      </div>
      <div class="content wid-100 d-flex flex-column">
        <div class="content-fade"> <!-- This is the fade element --> </div>
        <div class="wid-100 pad-y-025 pad-x-05 d-flex text-center flex-column bg-cs-white flex-grow-1 justify-content-end">
          <h3 class="oswald txt-cs-black fw-600">
            {{ recipe.name }}
          </h3>
          <div v-if="isActiveSelection.favorites != ''" class="d-flex justify-content-start">
            <button @click="deleteFavorite(recipe.id)" class="btn btn-danger mdi mdi-delete d-flex"></button>
          </div>
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
  height: 20rem;
  border-radius: 1rem;
  align-items: center;
  overflow: hidden;
}
.content{
  min-height: 33%;
}
</style>