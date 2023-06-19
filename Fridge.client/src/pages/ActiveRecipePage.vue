<template>
  <div class="card" v-if="activeRecipe">
    {{ activeRecipe.name }}
    <img :src="activeRecipe.image" alt="">
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
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
          await recipesService.getActiveRecipeFromApi(route)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      }

      onMounted(()=>{
        AppState.activeRecipe = null
        getActiveRecipeFromApi(route)
      })
      return {
        activeRecipe: computed(() => AppState?.activeRecipe)
      }
    }
  }
</script>

<style scoped>

</style>