<template>
  Grocery Page
</template>
  
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
  export default {
    props:{

    },
    setup() {
      return {
        pantry: computed(() => AppState?.pantry.filter(p => p.archived == true || p.qty == 0))
      }
    }
  }
</script>

<style scoped>

</style>