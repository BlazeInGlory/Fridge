<template>
  <div class="about text-center m-5">
    <form class="account-form" @submit.prevent="handleSubmit">
    <img class="rounded-circle m-2" :src="account.picture" alt="" />
    <div class="card m-2">
      <h1>Welcome {{ account.name }}</h1>
    <div class="mb-3">
      <label for="url" class="p-3">Choose img from URL</label>
<input type="url" name="url" id="url"
       placeholder="https://example.com"
       pattern="https://.*" size="30" v-model="editable.url">
       <button class="btn btn-success m-1">Submit</button>
</div>
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email Address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" :placeholder="account.email" v-model="editable.email">
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Recipe Preferences:</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
</div>
<div class="mb-5">
  <button class ="btn btn-primary" type="submit">
    <i></i>Save Changes</button>
    <button class="btn btn-dark" @click="Logout">
      <i class="mdi mdi-logout"></i>
      logout
    </button>
  </div>
</form>
  <div class="spacing">



  </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';
import {ref, watchEffect} from 'vue'
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";


export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if(!AppState.account)
      {return}
      editable.value = {...AppState.account}
    })
    return {
      editable,

      async handleSubmit(){
        try {
          await accountService.editAccount(editable.value)
          // router.push({name: 'Account', params: { accountId: editable.value.id}})
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

.spacing{
  height: 100px;
  margin-bottom: 20px;
}


</style>
