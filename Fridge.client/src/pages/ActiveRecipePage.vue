<template>
  <div class="container-fluid">

    <div class="row">

      <div class="col-12 p-0">
        <div class="selection d-flex flex-row justify-content-between">
          <div class="option" @click="makeRecipe(activeRecipe.ingredients)">
            Make Recipe
          </div>
          <div class="option" @click="favoriteRecipe(activeRecipe.id)">
            Favorite
          </div>
        </div>
      </div>

    </div>

    <section class="row">
      <div class="col-12 p-2" v-if="activeRecipe">
        <div class="active-recipe-card">
          <div class="recipe-img d-flex flex-column justify-content-end"
            v-bind:style='{ backgroundImage: "url(" + activeRecipe.image + ")", }'>
            <div class="content-fade"> <!-- This is the fade element --> </div>
          </div>

          <div class="title text-center p-2">
            <h2 class="oswald">
              {{ activeRecipe.name }}
            </h2>
          </div>

          <div class="ingredients d-flex flex-row flex-wrap p-2">
            <div v-for="i in activeRecipe.ingredients" :key="i.name" class="ingredient-pill">
              <div :title="i.original">
                {{ i.amount }} {{ i.unitUs }} {{ i.name }}
              </div>
            </div>
          </div>

          <br />

          <div v-html="activeRecipe.summary" class="recipe-summary p-2"></div>

          <br />

          <div class="instructions p-2">
            <div v-for="s in activeRecipe.steps" :key="s.number">
              {{ s.number }}: {{ s.step }} <br />
            </div>
          </div>

        </div>
      </div>

    </section>
  </div>
</template>
  
<script>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { recipesService } from '../services/RecipesService'
import { AppState } from '../AppState'
import { unitsConversionService } from '../services/UnitsConversionService'
import { pantryService } from '../services/PantryService'
export default {
  setup() {
    const route = useRoute().params.id

    async function getActiveRecipeFromApi(route) {
      try {
        if (AppState.activeRecipe) { return }
        await recipesService.getActiveRecipeFromApi(route)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }

    async function getMyPantry() {
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
    }

    onMounted(() => {
      getActiveRecipeFromApi(route)
      getMyPantry()
    })
    onUnmounted(() => {
      AppState.activeRecipe = null
    })
    return {
      activeRecipe: computed(() => AppState?.activeRecipe),

      makeRecipe(ingredients) {
        unitsConversionService.makeRecipe(ingredients)
      },

      async favoriteRecipe(recipeId) {
        try {
          await recipesService.favoriteRecipe(recipeId)
        } catch (error) {
          logger.error(error, 'couldnt fav')
          Pop.error(error)
        }
      }

    }
  }
}
</script>

<style scoped>
.oswald {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
}

h2 {
  font-size: 2.3rem;
}

.active-recipe-card {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
}

.recipe-img {
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

.ingredient-pill {
  background-color: #D9D9D9;
  padding: 0.5rem 1.2rem;
  text-transform: capitalize;
  margin: 0.25rem;
  border-radius: 1000rem;
}

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
</style>