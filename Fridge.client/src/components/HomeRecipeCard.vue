<template>
<router-link :to="{ name: 'ActiveRecipe', params: {id: recipe.id}}" :title="recipe.name">
<div class="recipe-card bg-cs-white wid-100 d-flex flex-column align-items-center justify-content-between overflow-hidden" v-bind:style='{backgroundImage: "url(" + recipe.image +")", }'>
    <div class="title-fade">
      <h3>
        {{ homeRecipe.name }}
      </h3>
    </div>
</div>
</router-link>
</template>


<script>
// import { AppState } from "../AppState.js";
import { Recipe } from '../models/Recipe'
import { recipesService } from "../services/RecipesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    homeRecipe: {type: Recipe, required: true}
  },

  setup(){
    return {
       async getRandomRecipe() {
      try {
        await recipesService.getRandomRecipe()
      } catch (error) {
        logger.log(error, 'not grabbing recipe?')
        Pop.error(error)
      }
    }
  }
}
}
</script>



<style lang="scss" scoped>

.recipe-card {
  background-size: cover;
  background-position: 50%;
  // width: 100%;
  height: 20rem;
  border-radius: 1rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
  // overflow: hidden;
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


</style>