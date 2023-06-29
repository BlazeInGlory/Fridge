<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 mt-3">
        <!-- NOTE this is the account picture -->

        <form class="account-form" @submit.prevent="handleSubmit()">

          <div class="account-card pad-05">
            <div class="d-flex flex-column align-items-center wid-100">
              <img class="rounded-circle m-2" :src="account.picture" alt="" />
            </div>

            <label for="profile-name" class="mt-3">
              Nickname
            </label>
            <input type="text" class="search-bar text-center account-entry" name="profile-name"
              :placeholder="account.name">

            <label for="profile-image" class="mt-3">
              Image Link
            </label>
            <input name="profile-image" type="link" pattern="https://.*" class="search-bar text-center account-entry"
              :placeholder="account.pictures" v-model="editableProfile.url">

            <label for="email" class="mt-3">
              Email Address
            </label>
            <input name="email" type="email" pattern="https://.*" class="search-bar text-center account-entry"
              :placeholder="account.email" v-model="editableProfile.email">

            <!-- <div class="mb-3">
              <label for="url" class="p-3">Choose img from URL</label>
              <input type="url" name="url" id="url" placeholder="Img Url..." pattern="https://.*" size="30"
                v-model="editableProfile.url">
            </div>
    
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email:</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" :placeholder="account.email"
                v-model="editableProfile.email">
            </div> -->

            <!-- SECTION DIET PREFERENCES -->

            <div class="wid-100 mt-3">
              <div class="form-check">
                <input :checked="checkPreferences('glutenFree')" class="form-check-input" name="glutenFree"
                  type="checkbox" value="glutenFree" id="glutenFree" v-model="editable.dietPreference">
                <label class="form-check-label" for="glutenFree">
                  glutenFree
                </label>

              </div>

              <div class="form-check">
                <input :checked="checkPreferences('Vegetarian')" class="form-check-input" name="Vegetarian"
                  type="checkbox" value="Vegetarian" id="Vegetarian" v-model="editable.dietPreference">
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
                <input :checked="checkPreferences('dairyFree')" class="form-check-input" name="dairyFree" type="checkbox"
                  value="dairyFree" id="dairyFree" v-model="editable.dietPreference">
                <label class="form-check-label" for="dairyFree">
                  dairyFree
                </label>
              </div>

              <div class="form-check">
                <input :checked="checkPreferences('lowFodmap')" class="form-check-input" name="lowFodmap" type="checkbox"
                  value="lowFodmap" id="lowFodmap" v-model="editable.dietPreference">
                <label class="form-check-label" for="lowFodmap">
                  lowFodmap
                </label>
              </div>
            </div>

            <button class="btn btn-primary wid-100 mt-3" type="submit" @click="test">
              <i class="mdi mdi-content-save-plus"></i>
              Save Changes
            </button>
          </div>

        </form>
        <div class="mb-5">


          <button class="btn btn-dark wid-100 mt-4" @click="logout">
            <i class="mdi mdi-logout"></i>
            Logout
          </button>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
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

    watchEffect(() => {
      if (!AppState.account) { return }
      editable.value = { ...AppState.account }
    })
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

.account-card {
  background-color: var(--cs-white);
  border-radius: 0.5rem;
}

.account-entry {
  font-size: 1.6rem;
  font-weight: 600;
}
</style>
