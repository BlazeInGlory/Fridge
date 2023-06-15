<template>
  <div v-if="!shopping">

  </div>
  <div v-for="f in pantry" :key="f.id">
    <GroceryListItem :foodItem="f"/>
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
  export default {
    props:{

    },
    setup() {
      onMounted(()=>{
            AppState.shopping = false
        })
      return {
        pantry: computed(() => AppState?.pantry.filter(p => p.quantity <= 0 || p.archived)),
        shopping: computed(() => AppState.shopping)
      }
    }
  }
</script>

<style scoped>

</style>