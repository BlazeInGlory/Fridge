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
      <div class="col-12 p-0" v-for="(f, index) in pantry?.filter(f => f?.archived || f?.quantity <= 0)"
        :key="f.id">
        <GroceryListItem class="p-1" :class="{ 'list-odd': index % 2 == 1 }" :foodItem="f" />
      </div>
    </section>

    <section class="row list-container p-0" v-else>
      <div class="col-12 p-0" v-for="(f, index) in pantry?.filter(f => f.inCart)" :key="f.id">
        <GroceryListItemActive class="p-1" :class="{ 'list-odd': index % 2 == 1 }" :foodItem="f" />
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

    async function getMyPantry() {
      try {
        await pantryService.getMyPantry();
        AppState.filteredPantry = AppState.pantry
      }
      catch (error) {
        Pop.error(error);
        logger.log(error, "[GroceryPage: getMyPantry()]");
        if (AppState.logging) { logger.log('Getting the pantry items') }
        await pantryService.getMyPantry()
      }
    }

    onMounted(() => {
      logger.log(AppState.pantry)
      getMyPantry()
    })


    return {
      pantry: computed(() => AppState?.pantry),
      // pantryItems: computed(() => AppState?.pantry),
      shopping: computed(() => AppState.shopping),
      // cart: computed(()=> AppState?.pantry),
      oddListIndex,

      shoppingFlip() {
        AppState.shopping = !AppState.shopping
        oddListIndex.value = true
      },
      isOddListIndex() {
        if (oddListIndex.value) {
          oddListIndex.value = !oddListIndex.value
          return true
        } else {
          oddListIndex.value = !oddListIndex.value
          return false
        }
      },
      clearCart() {
        AppState.pantry.forEach(f => {
          f.inCart = false
          f.crossedOff = false
        })
      }
    }
  }
}
</script>

<style scoped>
/* @import "../assets/scss/_variables.scss"; */
.selection {
  background-color: var(--cs-gray);
  padding: 0.5rem 0;
}

.option {
  background-color: var(--cs-white);
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
  background-color: var(--cs-yellow);
  color: var(--rc-warn-txt);
}

.active {
  background-color: var(--cs-yellow);
  color: var(--rc-warn-txt);
}

.list-container {
  margin: 0.75rem 0.2rem;
  background-color: var(--cs-white);
  padding: 0.25rem;
  border-radius: 0.3rem;
  overflow: hidden;
}

/* .list-odd{
  background-color: var(--cs-gray);
} */</style>