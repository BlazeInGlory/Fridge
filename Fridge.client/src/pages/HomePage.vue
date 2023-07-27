<template>
  <div class="container-fluid">
    <section class="row">
  
      <!-- <RecipeCard :homeRecipe="homeRecipe" /> -->
  
      <div class="bubble bubble-bottom-left ms-5 mt-1" contenteditable>Food Joke:
        {{ foodJoke }}...
      </div>
  
      <div class="bubble bubble-bottom-left m-5" contenteditable>Food Fact:
        {{ foodTrivia }}
      </div>
  
    </section>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { triviaJokeService } from "../services/TriviaJokeService.js"
import { recipesService } from "../services/RecipesService.js";
import { logging } from '../utils/Logger';


export default {
  setup() {

    onMounted(() => {
      // getRandomRecipe()
      // getJokeFromSpoonacular()
      // getTriviaFromSpoonacular()
      testLogging()
    })

    function testLogging(){
      logging.log('this is a log from the logging', 'this is another')
      logging.warn('this is a warning', 'this is another')
      logging.error('this is an error', 'this is another')
      logging.assert('this is an assert', 'this is another')
      logging.trace('this is a trace', 'this is another')
    }

    async function getTriviaFromSpoonacular() {
      try {
        await triviaJokeService.getTriviaFromSpoonacular()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getJokeFromSpoonacular() {
      try {
        await triviaJokeService.getJokeFromSpoonacular()
      } catch (error) {
        Pop.error(error)
      }
    }

    // async function getRandomRecipe() {
    //   try {
    //     await recipesService.getRandomRecipe()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }

    return {
      foodTrivia: computed(() => AppState?.foodTrivia?.text.replace("{", "")),
      foodJoke: computed(() => AppState?.foodJoke?.text.replace("{", "")),
      // homeRecipe: computed (() =>AppState.homeRecipe)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bubble {
  position: relative;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 24px;
  width: 300px;
  background: #fff;
  border-radius: 40px;
  padding: 24px;
  text-align: center;
  color: #000;
}

.bubble-bottom-left:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 24px solid #fff;
  border-right: 12px solid transparent;
  border-top: 12px solid #fff;
  border-bottom: 20px solid transparent;
  left: 32px;
  bottom: -24px;
}
</style>
