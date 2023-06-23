<template>
<div class="container-fluid">

  <section class="row">
      
      <div class="col-12 p-0">
      <div class="selection d-flex flex-row justify-content-between">
        <div type="button" class="option" v-if="!shopping" @click="shoppingFlip()">
          Go Shopping
        </div>
        <div type="button" class="option" v-if="shopping" @click="shoppingFlip(), clearCart()">
          Stop Shopping
        </div>
      </div>
    </div>

  </section>

  <section class="row list-container p-0" v-if="!shopping">
    <div class="col-12 col-md-6 p-0" v-for="f in pantry" :key="f.id">
      <GroceryListItem class="p-1" :class="{'list-odd': isOddListIndex()}" :foodItem="f" v-if="f.quantity <= 0 || f.archived"/>
    </div>
  </section>

  <section class="row list-container p-0" v-else>
    <div class="col-12 col-md-6 p-0" v-for="f in cart" :key="f.id">
      <GroceryListItemActive class="p-1" :class="{'list-odd': isOddListIndex()}" :foodItem="f"/>
    </div>
  </section>

</div>
</template>
  
<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pantryService } from '../services/PantryService'
  export default {
    setup() {
      let oddListIndex = ref(true)

      onMounted(()=>{
        getMyPantry()
      })

      async function getMyPantry(){
        if (!AppState.pantry) {
        try {
          if (AppState.logging) { logger.log('No Pantry, getting pantry') }
          await pantryService.getMyPantry()
          if (AppState.logging) { logger.log('the pantry is now:', AppState.pantry) }
        } catch (error) {
          Pop.error(error)
          logger.error(error, '[RecipesPage: getRecipesFromSpoonacular() 1]')
        }
      }
      }


      return {
        pantry: computed(() => AppState?.pantry),
        shopping: computed(() => AppState?.shopping),
        cart: computed(()=> AppState?.pantry.filter(f=>f.inCart)),
        oddListIndex,
        shoppingFlip(){
          AppState.shopping = !AppState.shopping
          // oddListIndex.value = true
        },
        isOddListIndex(){
          if(oddListIndex.value){
            oddListIndex.value = !oddListIndex.value
            return true
          }else{
            oddListIndex.value = !oddListIndex.value
            return false
          }
        },
        clearCart(){
          AppState.pantry.forEach(f=> f.inCart = false)
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
  width: 1000%;
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
.list-container{
  margin: 0.75rem 0.2rem;
  background-color: white;
  padding: 0.25rem;
  border-radius: 0.3rem;
  overflow: hidden;
}
.list-odd{
  background-color: #e3e3e3;
}
</style>