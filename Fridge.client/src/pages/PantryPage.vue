<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 p-0">
        <div class="selection d-flex flex-row justify-content-between">
          <div class="option" @click="modalInputFocus()" data-bs-toggle="modal" data-bs-target="#pantryModal">
            Add
          </div>
          <div class="option" @click="toggleFilter()" id="searchToggleButtonHTM">
            Filter
          </div>
        </div>
      </div>
      <div class="col-12" id="pantrySearchToggleAreaHTM">
        <PantrySearchBar />
      </div>
    </section>

    <div class="row mt-2">

      <div v-for="p in pantryItems" :key="p.id" class="col-6 d-flex flex-row justify-content-center p-2">
        <PantryCard :food="p" />
      </div>

    </div>
  </div>
</template>
  
<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pantryService } from '../services/PantryService'
export default {
  setup() {

    let searchToggled = ref(false)

    async function getMyPantry() {
      try {
        await pantryService.getMyPantry();
        AppState.filteredPantry = AppState.pantry
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

    onUnmounted(() => {
      AppState.filteredPantry = AppState.pantry
    })

    return {
      searchToggled,
      pantryItems: computed(() => AppState?.filteredPantry?.filter(f => !f?.archived && f?.quantity > 0)),

      toggleFilter() {
        if (!searchToggled.value) {
          document.getElementById('pantrySearchToggleAreaHTM').style.height = '3rem';
          document.getElementById('searchToggleButtonHTM').style.backgroundColor = '#FFCA4B';
          document.getElementById('searchToggleButtonHTM').style.color = '#422C00';
          document.getElementById('pantrySearchBarHTM').focus()
        }
        else {
          document.getElementById('pantrySearchToggleAreaHTM').style.height = '0';
          document.getElementById('searchToggleButtonHTM').style.backgroundColor = '#fff';
          document.getElementById('searchToggleButtonHTM').style.color = 'rgb(35, 35, 35)';
        }
        searchToggled.value = !searchToggled.value
      },

      modalInputFocus() {
        logger.log('focusing on modal 1 with timeout of 470')

        setTimeout(() =>
          document?.getElementById('nutritionixSearchBarHTM').focus(),
          470
        )
      }
    }
  }

}

</script>

<style scoped>
#pantrySearchToggleAreaHTM {
  height: 0;
  overflow: hidden;
  transition: all 200ms;
  background-color: white;
  margin: 0;
}

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