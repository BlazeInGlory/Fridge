<template>
  <div class="text-center">
    <img class="rounded-circle m-2" :src="account.picture" alt="" />
    <form class="account-form" @submit.prevent="handleSubmit()">

      <div class="card m-2">

        <h1>{{ account.name }}</h1>

        <div class="mb-3">
          <label for="url" class="p-3">Choose img from URL</label>
          <input type="url" name="url" id="url"
            placeholder="https://example.com"
            pattern="https://.*" 
            size="30" 
            v-model="editable.url">
        </div>
        
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email:</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" :placeholder="account.email" v-model="editable.email">
        </div>

        <div class="col-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="GlutenFree" id="Gluten Free" v-model="editable.GlutenFree">
            <label class="form-check-label" for="gluten Free" >
              Gluten Free
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Ketogenic" v-model="editable.Ketogenic">
              <label class="form-check-label" for="Ketogenic">
               Ketogenic
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Vegetarian" v-model="editable.Vegetarian">
              <label class="form-check-label" for="Vegetarian">
               Vegetarian
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Lacto-Vegetarian" v-model="editable.LactoVegetarian">
              <label class="form-check-label" for="Lacto-Vegetarian">
               Lacto-Vegetarian
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Ovo-Vegetarian" v-model="editable.OvoVegetarian">
              <label class="form-check-label" for="Ovo-Vegetarian">
               Ovo-Vegetarian
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Vegan" v-model="editable.Vegan">
              <label class="form-check-label" for="Vegan">
               Vegan
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Pescetarian" v-model="editable.Pescetarian">
              <label class="form-check-label" for="Pescetarian">
               Pescetarian
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Paleo" v-model="editable.Paleo">
              <label class="form-check-label" for="Paleo">
               Paleo
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Primal" v-model="editable.Primal">
              <label class="form-check-label" for="Primal">
               Primal
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Low Fodmap" v-model="editable.LowFodmap">
              <label class="form-check-label" for="Low Fodmap">
               Low Fodmap
             </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Whole30" v-model="editable.Whole30">
              <label class="form-check-label" for="Whole30">
               Whole30
             </label>
          </div>
        </div>
      
        <button class ="btn btn-primary" type="button" @click="test">
          <i class="mdi mdi-content-save-plus"></i>
          Save Changes
        </button>

        <!-- 'gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole30' -->
      </div>
      
    </form>
      <div class="mb-5">
        
        
        <button class="btn btn-dark" @click="logout">
          <i class="mdi mdi-logout"></i>
          Logout
        </button>
      
      </div>
    
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService'
import {ref, watchEffect} from 'vue'
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";


export default {
  setup() {
    const editable = ref({})


  
    // watchEffect(() => {
    //   if(!AppState.account)
    //   {return}
    //   editable.value = {...AppState.account}
    // })
    return {
      editable,
      test() {
        console.log(editable.value)
      },

      async handleSubmit(){
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      },

      account: computed(() => AppState.account),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
