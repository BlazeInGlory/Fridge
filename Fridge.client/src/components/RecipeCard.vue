<template>
  
  <div 
  class="bg-cs-white wid-100 recipe-card d-flex flex-column justify-content-between" 
    v-bind:style='{ backgroundImage: "url(" + recipeImgCheck(recipe.image) + ")", }'
    >
    

    <div class="user-pref-notice"
    v-if="prefConflict(account, recipe)">
    <div class="pref-exclamation">
      <i class="mdi mdi-exclamation-thick"></i>
    </div>
  </div>
  
  <div v-if="isActiveSelection.favorites != ''" class="d-flex justify-content-start px-2 py-3 delete-button">
    <button @click="deleteFavorite(recipe.id)" class="btn btn-danger mdi mdi-delete d-flex"></button>
  </div>
  
  
  <router-link class="recipe-link" :to="{ name: 'ActiveRecipe', params: { id: recipe.id } }" :title="recipe.name">
  </router-link>

      <div class="wid-100 fw-600 text-uppercase text-center pad-025 near-exp oswald"
      v-if="missingIng > 0">
        <!-- TODO set up functions to calculate missing ingredients -->
        Missing {{ missingIng }} Ingredients
      </div>
      <div v-else class="wid-100 fw-600 text-uppercase text-center pad-025 fresh oswald">
        Ready to Cook
      </div>

      <div class="d-flex flex-row flex-grow-1 wid-100 align-items-start justify-content-end">


        
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

</template>
  
<script>
import { computed, onMounted, ref } from "vue";
import { Recipe } from '../models/Recipe'
import { recipesService } from "../services/RecipesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { ingredientsService } from '../services/IngredientsService';
export default {
  props: {
    recipe: { type: Recipe, required: true }
  },
  setup(props) {
    let missingIng = ref(0)

    function countMissingIngredients(ing){
      missingIng.value = ingredientsService.countMissingIngredients(ing)
    }

    onMounted(()=>{
      countMissingIngredients(props.recipe.ingredients)
    })

    return {
      isActiveSelection: computed(() => AppState.activeSelection),
      account: computed(() => AppState.account),
      missingIng,

      async deleteFavorite(recipeId) {
        try {
          logger.log('deleting favorite')
          if(await Pop.confirm('Are you sure you want to delete this favorite?')){
            await recipesService.favoriteRecipe(recipeId)
          }
        } catch (error) {
          logger.log(error, 'deleting recipe')
          Pop.error(error, 'deleting recipe')
        }
      },

      prefConflict(account, recipe){
        if(account.vegetarian && !recipe.vegetarian){
          return true
        }
        if(account.vegan && !recipe.vegan){
          return true
        }
        if(account.glutenFree && !recipe.glutenFree){
          return true
        }
        if(account.dairyFree && !recipe.dairyFree){
          return true
        }
        if(account.lowCarb && !recipe.lowCarb){
          return true
        }
        return false
      },

      recipeImgCheck(recipeImg){
        if(recipeImg == ""){
          return 'src/assets/img/default_recipe.jpg'
        }
        if(recipeImg == "https://spoonacular.com/recipeImages/606953-556x370.jpg"){
          return 'src/assets/img/default_recipe.jpg'
        }
        return recipeImg
      }

    }
  }
}
</script>

<style scoped>
.recipe-link{
  height: 100%;
  width: 100%;
  position: absolute;
}
.recipe-card {
  background-size: cover;
  background-position: 50%;
  min-height: 20rem;
  border-radius: 1rem;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.content{
  min-height: 33%;
}
.icon img{
  height: 2.3rem;
  aspect-ratio: 1/1;
  margin: 0.2rem 0.1rem;
}
.user-pref-notice{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pref-exclamation{
    color: var(--rc-spoil);
    height: 25%;
    aspect-ratio: 1/1;
    border: solid 0.25rem var(--rc-spoil);
    border-radius: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
}
.delete-button{
    z-index: 100;
    position: absolute;
    left: 0.5rem;
    top: 2rem;
}
</style>