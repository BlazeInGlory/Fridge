<template>
  <div class="container-fluid">
    <div class="row">

      <div v-for="p in pantryItems" :key="p.id"
      class="col-6 d-flex flex-row justify-content-center p-0">
        <PantryCard :food="p"/>
      </div>

      <div class="col-6 d-flex flex-row justify-content-center p-0">
        <button type="button" class="newPantryItem" data-bs-toggle="modal" data-bs-target="#pantryModal">
          <i class="mdi mdi-plus-thick"></i>
          <p>Add Item</p>
        </button>
      </div>

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

      async function getMyPantry(){
        if (AppState.pantry != null){
          return
        }
        try {
          await pantryService.getMyPantry()
        } catch (error) {
          Pop.error(error)
          logger.log(error, '[PantryPage: getMyPantry()]')
        }
      }

      onMounted(()=>{
        getMyPantry()
      })
      return {
        pantryItems: computed(()=>AppState?.pantry)
      }
    }
  }
</script>

<style scoped>
.newPantryItem{
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
.newPantryItem i{
  font-size: 6rem;
  padding: 0.25rem 0 0 0;
  line-height: 1;
}
.newPantryItem p{
  font-size: 1.2rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
}
</style>