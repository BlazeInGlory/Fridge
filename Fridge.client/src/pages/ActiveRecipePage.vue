<template>
  <div class="container-fluid">

    <section class="row options-container d-flex flex-column">

      <div class="successfully-made oswald fw-600"
      :class="{'completed': recipeMade}">
        Updated Pantry
      </div>

      <div class="col-12 p-0">
        <div class="selection d-flex flex-row justify-content-between">
          <div class="option" @click="makeRecipe(activeRecipe.ingredients)">
            Make Recipe
          </div>
          <div v class="option" @click="favoriteRecipe(activeRecipe.id)">
            Favorite
          </div>
        </div>
      </div>

    </section>

    <section class="row">
      <div class="col-12 p-2" v-if="activeRecipe">
        <div class="active-recipe-card">
          <div class="recipe-img d-flex flex-column justify-content-between align-items-start"
            v-bind:style='{ backgroundImage: "url(" + recipeImgCheck(activeRecipe.image) + ")", }'>

            <router-link :to="{ name: 'Recipes' }">
              <div class="mar-075 pad-05 rounded cs-black d-flex justify-content-center align-items-center back-button">
                <i class="mdi mdi-keyboard-backspace" title="Back to Recipes"></i>
              </div>
            </router-link>

            <div class="content-fade"> <!-- This is the fade element --> </div>
          </div>

          <div class="title p-3">
            <h2 class="oswald fw-600 wid-100 text-left">
              {{ activeRecipe.name }}
            </h2>
          </div>

          <div class="ingredients d-flex flex-row flex-wrap p-3">
            <h3 class="oswald fw-600 wid-100 text-left">
              Ingredients
            </h3>
            <div v-if="pantry" v-for="i in activeRecipe.ingredients" :key="i.name">
              <ActiveRecipeIngredient :ingredient="i" />
            </div>
          </div>

          <div class="description-container p-2">
            <h3 class="oswald fw-600 wid-100 text-left">
                Recipe Details
            </h3>
            <div class="description"
            @click="openDescription()"
            :class="{'open': descriptionOpen}">
              <div v-html="activeRecipe.summary" class="recipe-summary"></div>
            </div>
          </div>
          <!-- <br /> -->

          <!-- <br /> -->

          <div class="instructions p-2">
            <h3 class="oswald fw-600 wid-100 text-left">
              Instructions
            </h3>
            <div v-for="(s, index) in activeRecipe.steps" :key="s.number" class="instruction">
              <div class="recipe-step d-flex flex-row elevation-1" :class="{ 'step-odd': index % 2 == 1 }">
                <div class="step-num oswald fw-600">
                  {{ s.number }}: 
                </div>
                <div class="step-text">
                  {{ s.step }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  </div>
</template>
  
<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
    const recipeMade = ref(false)
    const descriptionOpen = ref(false)

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
      pantry: computed(()=> AppState?.pantry),
      recipeMade,
      descriptionOpen,

      async makeRecipe(ingredients) {
        let outcome = await unitsConversionService.makeRecipe(ingredients)
        if ( outcome ){
          recipeMade.value = true
        }
      },

      async favoriteRecipe(recipeId) {
        try {
          await recipesService.favoriteRecipe(recipeId)
        } catch (error) {
          logger.error(error, "Couldn't add recipe to favorites.")
          Pop.error(error)
        }
      },

      recipeImgCheck(recipeImg){
        if(recipeImg == ""){
          return 'src/assets/img/default_recipe.jpg'
        }
        if(recipeImg == "https://spoonacular.com/recipeImages/606953-556x370.jpg"){
          return 'src/assets/img/default_recipe.jpg'
        }
        return recipeImg
      },

      openDescription(){
        descriptionOpen.value = !descriptionOpen.value
      }

    }
  }
}
</script>

<style scoped>
.options-container{
  position: relative;
}
.back-button {
  height: 3.5rem;
  aspect-ratio: 1/1;
  opacity: 75%;
  line-height: 1;
  font-size: 2rem;
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

/* .ingredient-pill {
  background-color: #D9D9D9;
  padding: 0.5rem 1.2rem;
  text-transform: capitalize;
  margin: 0.25rem;
  border-radius: 1000rem;
} */

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
  width: 0;
  flex-grow: 1;
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
.instruction{
  padding: 0.4rem 0;
}
.step-num{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 2.4rem;
  background-color: var(--cs-yellow) ;
}
.step-text{
  width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
}
.step-odd{
  background-color: var(--cs-gray);
}
.recipe-step{
  min-height: 3rem;
  overflow: hidden;
  border-radius: 0.5rem;
}
.successfully-made{
  /* display: none; */
  display: flex;
  top: -100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 1.5rem;
  /* opacity: 100%; */
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: var(--rc-fresh);
  color: var(--cs-fresh-txt);
  transition: all ease-in-out 350ms;
}
.successfully-made.completed{
  top: 0;
  opacity: 100%;
  display: flex;
}
.description-container{
  margin: 1rem 0;
}
.description{
    max-height: 5rem;
    transition: all ease-in-out 500ms;
    overflow: hidden;
    position: relative;
    border-bottom: solid 4px white;
    margin-bottom: 2px;
}
.description::before{
  content: '';
  display: block;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0) 90%);
  height: 5rem;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.description::after{
  content: '';
  display: block;
  position: absolute;
  bottom: 0.5rem;
  left: calc(50% - 0.5rem);
  width: 1rem;
  aspect-ratio: 1/1;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  transform: rotate(45deg);
  transition: all 450ms;
}
.description.open {
    max-height: 90vh;
    overflow-y: auto;
    padding: 0 0 3.5rem 0;
}

.description.open::after {
  transform: rotate(225deg);
}
</style>