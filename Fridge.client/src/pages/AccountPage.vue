<template>
  <div class="text-center">
    <img class="rounded-circle m-2" :src="account.picture" alt="" />
    <form class="account-form" @submit.prevent="handleSubmit()">

      <div class="card m-2">

        <h1>{{ account.name }}</h1>

        <div class="mb-3">
          <label for="url" class="p-3">Choose img from URL</label>
          <input type="url" name="url" id="url" placeholder="Img Url..." pattern="https://.*" size="30"
            v-model="editableProfile.url">
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email:</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" :placeholder="account.email"
            v-model="editableProfile.email">
        </div>

        <!-- SECTION DIET PREFERENCES -->

        <div class="col-10">
          <div class="form-check">
            <input :checked="checkPreferences('Ketogenic')" class="form-check-input" name="Ketogenic" type="checkbox"
              value="Ketogenic" id="Ketogenic" v-model="editable.dietPreference">
            <label class="form-check-label" for="Ketogenic">
              Ketogenic
            </label>

          </div>

          <div class="form-check">
            <input :checked="checkPreferences('Vegetarian')" class="form-check-input" name="Vegetarian" type="checkbox"
              value="Vegetarian" id="Vegetarian" v-model="editable.dietPreference">
            <label class="form-check-label" for="Vegetarian">
              Vegetarian
            </label>
          </div>

          <!-- :checked="checkPreferences('Ketogenic')" -->
          <!-- NOTE this is checking checked not working rn -->

          <div class="form-check">
            <input :checked="checkPreferences('Vegan')" class="form-check-input" name="Vegan" type="checkbox"
              value="Vegan" id="Vegan" v-model="editable.dietPreference">
            <label class="form-check-label" for="Vegan">
              Vegan
            </label>
          </div>

          <div class="form-check">
            <input :checked="checkPreferences('Pescetarian')" class="form-check-input" name="Pescetarian" type="checkbox"
              value="Pescetarian" id="Pescetarian" v-model="editable.dietPreference">
            <label class="form-check-label" for="Pescetarian">
              Pescetarian
            </label>
          </div>

          <div class="form-check">
            <input :checked="checkPreferences('Paleo')" class="form-check-input" name="Paleo" type="checkbox"
              value="Paleo" id="Paleo" v-model="editable.dietPreference">
            <label class="form-check-label" for="Paleo">
              Paleo
            </label>
          </div>

          <div class="form-check">
            <input :checked="checkPreferences('Primal')" class="form-check-input" name="Primal" type="checkbox"
              value="Primal" id="Primal" v-model="editable.dietPreference">
            <label class="form-check-label" for="Primal">
              Primal
            </label>
          </div>
        </div>

        <button class="btn btn-primary" type="submit" @click="test">
          <i class="mdi mdi-content-save-plus"></i>
          Save Changes
        </button>
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
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService'
import { ref } from 'vue'
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { Account } from "../models/Account.js";


export default {
  setup() {
    const editable = ref({
      dietPreference: []
    })
    const editableProfile = ref({})

    // watchEffect(() => {
    //   if(!AppState.account)
    //   {return}
    //   editable.value = {...AppState.account}
    // })
    // NOTE this gets account from api on page load
    // async function displayAccount() {
    //   try {
    //     await accountService.getAccount()
    //     logger.log(AppState.account)
    //   } catch (error) {
    //     logger.log(error)
    //   }
    // }

    // onMounted(() => {
    //   displayAccount()
    // })

    return {
      editable,
      editableProfile,
      // TODO this doesnt actually work..
      async handleSubmit() {
        try {
          logger.log('handling submit', editable.value)
          // let dietPreferencesArray = Object.keys(editable.value)
          // logger.log(dietPreferencesArray)

          // let filteredArray = dietPreferencesArray.filter(d => d == true)

          let body = editable.value
          // logger.log(body)
          await accountService.editAccount(body)
        } catch (error) {
          logger.log(error)
        }
      },

      // async handleSubmit() {
      //   try {
      //     logger.log(AppState.account)
      //     let dietPreferencesArray = Object.keys(editable.value)
      //     logger.log(dietPreferencesArray)

      //     // let filteredArray = dietPreferencesArray.filter(d => d == true)

      //     let body = { dietPreference: dietPreferencesArray }
      //     logger.log(body)
      //     await accountService.editAccount(body)
      //   } catch (error) {
      //     logger.error('[Editing Account]', error)
      //     Pop.error(error)
      //   }
      // },

      checkPreferences(diet) {
        // debugger
        let account = AppState.account
        if (!account.id) {
          return
        }
        let dietList = account.dietPreference
        let bool = dietList.includes(diet)
        return bool

        // logger.log(AppState.account)
        // if (account.dietPreference.length==0) {
        //   return
        // }
        // debugger

        // for (let i = 0; i < dietList.length; i++) {
        //   if (dietList[i] == diet) {
        //     return true
        //   }
        // }
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
