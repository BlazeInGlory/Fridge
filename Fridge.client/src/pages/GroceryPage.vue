<template>
  <div v-for="f in pantry" :key="f.id">
    <GroceryListItem :foodItem="f"/>
  </div>
</template>
  
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
  export default {
    props:{

    },
    setup() {
      return {
        pantry: computed(() => AppState?.pantry.filter(p => p.quantity <= 0 || p.archived))
      }
    }
  }
</script>

<style scoped>

</style>