<template>
  <div class="container-fluid">
    <section class="row">
      <PantrySearchBar />
    </section>
    <div class="row">
      <div class="col-12 p-0">
        <div class="selection d-flex flex-row justify-content-between">
          <div class="option" data-bs-toggle="modal" data-bs-target="#pantryModal">
            Add to Pantry
          </div>
          <div class="option" @click="selectOption('favorites')">
            Filter
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div v-for="p in pantryItems" :key="p.id" class="col-6 d-flex flex-row justify-content-center p-2">
        <PantryCard :food="p" />
      </div>

      <!-- <div class="col-6 d-flex flex-row justify-content-center p-0">
        <button type="button" class="newPantryItem" data-bs-toggle="modal" data-bs-target="#pantryModal">
          <i class="mdi mdi-plus-thick"></i>
          <p>Add Item</p>
        </button>
      </div> -->

    </div>
  </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pantryService } from '../services/PantryService'
export default {
  setup() {
    async function getMyPantry() {
      // if (AppState.pantry != null){
      //   return
      // }
      try {
        await pantryService.getMyPantry();
      }
      catch (error) {
        Pop.error(error);
        logger.log(error, "[PantryPage: getMyPantry()]");
        if (AppState.logging) { logger.log('Getting the pantry items') }
        await pantryService.getMyPantry()
      }
    }

    onMounted(() => {
      getMyPantry()
    })
    return {
      pantryItems: computed(() => AppState?.pantry?.filter(f => !f?.archived && f?.quantity > 0))
      // return AppState.towerEvents.filter(a => a.type == filterBy.value)
    }
  }

}

</script>

<style scoped>
.newPantryItem {
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border: 0;
  outline: 0;
  line-height: normal;
  padding: 0;
  color: rgb(35, 35, 35);
  border-radius: 10%;
  overflow: hidden;
  background-color: #fffbed;
}

.newPantryItem i {
  font-size: 6rem;
  padding: 0.25rem 0 0 0;
  line-height: 1;
}

.newPantryItem p {
  font-size: 1.2rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
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