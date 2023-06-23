<template>
  <router-link :to="{ name: 'ActiveRecipe', params: { id: recipe.id } }" :title="recipe.name">
    <div class="recipe-card" v-bind:style='{ backgroundImage: "url(" + recipe.image + ")", }'>
      <div class="notifications">
        Missing {{ recipe.missingIngredients.length }} Ingredients
      </div>
      <div class="title-fade">
        <h3>
          {{ recipe.name }}
        </h3>
        <div v-if="activeSelection == favorites">
          <button @click="deleteFavorite(recipe.id)" class="btn btn-danger mdi mdi-delete d-flex"></button>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
<script>
import { Recipe } from '../models/Recipe'
import { recipesService } from "../services/RecipesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    recipe: { type: Recipe, required: true }
  },
  setup() {
    return {
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
  background-color: white;
  width: 100%;
  height: 20rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.title-fade {
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 0) 100%);
  width: 100%;
  height: 36%;
  padding: 0.3rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}

.notifications {
  width: 100%;
  background-color: #FFCA4B;
  padding: 0.25rem;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  color: #422C00;
  text-align: center;
}
</style>