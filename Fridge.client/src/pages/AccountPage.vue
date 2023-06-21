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
            <input :checked="checkPreferences('Ketogenic')" class="form-check-input" type="checkbox" value=""
              id="Ketogenic" v-model="editable.Ketogenic">
            <label class="form-check-label" for="Ketogenic">
              Ketogenic
            </label>
          </div>

          <div class="form-check">
            <input :checked="checkPreferences('Vegetarian')" class="form-check-input" type="checkbox" value=""
              id="Vegetarian" v-model="editable.Vegetarian">
            <label class="form-check-label" for="Vegetarian">
              Vegetarian
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
        </div>

        <button class="btn btn-primary" type="submit" @click="test">
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
import { ref } from 'vue'
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";


export default {
  setup() {
    const editable = ref({})
    const editableProfile = ref({})



    // watchEffect(() => {
    //   if(!AppState.account)
    //   {return}
    //   editable.value = {...AppState.account}
    // })
    return {
      editable,
      editableProfile,
      test() {
        console.log(editable.value)
      },
      // TODO this doesnt actually work..
      async handleSubmit() {
        try {
          let dietPreferencesArray = Object.keys(editable.value)
          logger.log(dietPreferencesArray)

          // let filteredArray = dietPreferencesArray.filter(d => d == true)

          let body = { dietPreference: dietPreferencesArray }
          logger.log(body)
          await accountService.editAccount(body)
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      },

      checkPreferences(diet) {
        // logger.log(AppState.account)
        if (!AppState.account.dietPreference) {
          return
        }
        // debugger
        let dietList = AppState.account.dietPreference
        for (let i = 0; i < dietList.length; i++) {
          if (dietList[i] == diet) {
            return true
          }
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
