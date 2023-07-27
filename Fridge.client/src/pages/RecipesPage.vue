<template>
  <div class="container-fluid">

    <div class="row">

      <div class="col-12 p-0">
        <div class="selection d-flex flex-row justify-content-between">
          <div class="option" @click="selectOption('recommended')" v-bind:class="isActiveSelection.recommended">
            Recommended
          </div>
          <div class="option" @click="selectOption('favorites')" v-bind:class="isActiveSelection.favorites">
            Favorites
          </div>
        </div>
      </div>

    </div>

    <div v-if="apiRecipes && isActiveSelection.recommended != ''" class="row mt-2">

      <div v-for="r in apiRecipes" :key="r.id" class="col-12 p-2"
      :class="{'order-1': prefConflict(account, r)}">
        <RecipeCard :recipe="r" />
      </div>

    </div>
    <div v-else-if="favoriteRecipes && isActiveSelection.favorites != ''" class="row mt-2">

      <div v-for="f in favoriteRecipes" :key="f.id" class="col-12 p-2">
        <RecipeCard :recipe="f" />
      </div>

    </div>

    <div v-else>
      <Spinner />
    </div>

  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { recipesService } from '../services/RecipesService'
import { pantryService } from '../services/PantryService'
export default {
  setup() {

    async function getRecipesFromSpoonacular() {
      // NOTE don't get more recipes if I already have some
      if (AppState.spoonacularRecipes) { return }
      // If I don't have a pantry populated, populate my pantry
      if (!AppState.pantry) {
        try {
          if (AppState.logging) { logger.log('No Pantry, getting pantry') }
          await pantryService.getMyPantry()
          if (AppState.logging) { logger.log('the pantry is now:', AppState.pantry) }
        } catch (error) {
          Pop.error(error)
          logger.log(error, '[RecipesPage: getRecipesFromSpoonacular() 1]')
        }
      }
      // pull the ingredient names out of my pantry so I 
      // can send them up to spoonacular
      let ingredients = ''
      for (let i = 0; i < AppState?.pantry.length; i++) {
        ingredients += AppState.pantry[i].name + ', '
      }
      if (AppState.logging) { logger.log('The ingredients being sent to the api are:', ingredients) }

      // get the recipes
      try {
        if (AppState.logging) { logger.log('Now getting recipes from Spoonacular') }
        await recipesService.getRecipesFromSpoonacular(ingredients)
      } catch (error) {
        Pop.error(error)
        logger.log(error, '[RecipesPage:getRecipesFromSpoonacular() 2')
      }
    }

    async function getMyFavoriteRecipes() {
      try {
        if (AppState.favoriteRecipes){
          return
        }
        await recipesService.getMyFavoriteRecipes()
      } catch (error) {
        Pop.error(error)
        logger.log(error, '[RecipesPage: getMyFavoriteRecipes()]')
      }
    }

    onMounted(() => {
      getRecipesFromSpoonacular()
      getMyFavoriteRecipes()
      AppState.activeSelection = {
        recommended: 'active',
        favorites: ''
      }
    })

    return {
      isActiveSelection: computed(() => AppState.activeSelection),
      apiRecipes: computed(() => AppState?.spoonacularRecipesWithDetails),
      favoriteRecipes: computed(() => AppState?.favoriteRecipesWithDetails),
      account: computed(() => AppState.account),

      selectOption(option) {
        let activeSelection = AppState.activeSelection
        activeSelection.recommended = ''
        activeSelection.favorites = ''
        if (option == 'favorites') {
          activeSelection.favorites = 'active'
        }
        else {
          activeSelection.recommended = 'active'
        }
        if (AppState.logging) { logger.log(activeSelection) }
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
      }
    }
  }
}
</script>

<style scoped>
.selection {
  background-color: #D9D9D9;
  padding: 0.5rem 0;
}

.option {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.65rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 1rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 140ms;
}

.option:hover {
  background-color: #FFCA4B;
  color: #422C00;
}

.active {
  background-color: #FFCA4B;
  color: #422C00;
}
</style>