<template>
  <!-- TODO set up list change to cross off items and 
  add them to our database -->
  <div v-if="!shopping">
    <button class="btn btn-dark" @click="shoppingFlip()">Go Shopping</button>
    <div v-for="f in pantry" :key="f.id">
      <GroceryListItem :foodItem="f"/>
    </div>
  </div>
  <div v-else>
    <button class="btn btn-dark" @click="shoppingFlip()">Stop Shopping</button>
    <div v-for="f in pantry" :key="f.id">
      <GroceryListItemActive :foodItem="f"/>
    </div>
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
        pantry: computed(() => AppState?.pantry.filter(p => p.quantity <= 0 || p.archived)),
        shopping: computed(() => AppState.shopping),
        shoppingFlip(){
          AppState.shopping = !AppState.shopping
        }
      }
    }
  }
</script>

<style scoped>

</style>