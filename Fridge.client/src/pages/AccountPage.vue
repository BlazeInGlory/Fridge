<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 mt-3" v-if="account">
        <!-- NOTE this is the account picture -->

        <form class="account-form" @submit.prevent="editAccount()">

          <div 
          class="account-card pad-05"
          >
            <div 
            class="d-flex flex-column align-items-center wid-100"
            >
              <img 
              class="rounded-circle m-2 logo" 
              :src="account.picture" 
              alt="Account Image" />
            </div>

            <label for="profile-name" class="mt-3">
              Nickname
            </label>
            <input 
            type="text" 
            class="search-bar text-center account-entry" 
            name="profile-name"
            :placeholder="account.name"
            v-model="editable.name"
            >

            <label for="profile-image" class="mt-3">
              Image Link
            </label>
            <input 
            name="profile-image" 
            type="link" 
            pattern="https://.*" 
            class="search-bar text-center account-entry"
            :placeholder="account.picture" 
            v-model="editable.picture"
            >

            <label for="email" class="mt-3">
              Email Address
            </label>
            <input 
            name="email" 
            type="email" 
            pattern="https://.*" 
            class="search-bar text-center account-entry"
            :placeholder="account.email" 
            v-model="editable.email"
            >

            <div class="wid-100 mt-3">
              <div class="form-check">
                <input 
                :checked="account.glutenFree" 
                class="form-check-input" 
                name="glutenFree"
                type="checkbox" 
                value="glutenFree" 
                id="glutenFree" 
                v-model="editable.glutenFree">
                <label class="form-check-label" for="glutenFree">
                  Gluten Free
                </label>
              </div>

              <div class="form-check">
                <input 
                :checked="account.vegetarian" 
                class="form-check-input" 
                name="Vegetarian"
                type="checkbox" 
                value="Vegetarian" 
                id="Vegetarian" 
                v-model="editable.vegetarian"
                >
                <label class="form-check-label" for="Vegetarian">
                  Vegetarian
                </label>
              </div>

              <div class="form-check">
                <input 
                :checked="account.vegan" 
                class="form-check-input" 
                name="Vegan" 
                type="checkbox"
                value="Vegan" 
                id="Vegan" 
                v-model="editable.vegan"
                >
                <label class="form-check-label" for="Vegan">
                  Vegan
                </label>
              </div>

              <div class="form-check">
                <input 
                :checked="account.dairyFree" 
                class="form-check-input" 
                name="dairyFree" 
                type="checkbox"
                value="dairyFree" 
                id="dairyFree" 
                v-model="editable.dairyFree"
                >
                <label class="form-check-label" for="dairyFree">
                  Dairy Free
                </label>
              </div>

              <div class="form-check">
                <input 
                :checked="account.lowCarb" 
                class="form-check-input" 
                name="lowCarb" 
                type="checkbox"
                value="lowCarb" 
                id="lowCarb" 
                v-model="editable.lowCarb"
                >
                <label class="form-check-label" for="lowCarb">
                  Low Carb
                </label>
              </div>
            </div>

            <button 
            class="btn btn-primary wid-100 mt-3" 
            type="submit" 
            @click="test"
            >
              <i class="mdi mdi-content-save-plus"></i>
              Save Changes
            </button>
          </div>

        </form>
        <div class="mb-5">

          <button 
          class="btn btn-dark wid-100 mt-4" 
          @click="logout"
          >
            <i class="mdi mdi-logout"></i>
            Logout
          </button>

        </div>

      </div>
    </section>
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

    return {
      editable,
      account: computed(() => AppState.account),
      
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },

      async editAccount() {
        if(await Pop.confirm('Are you sure you want to save these settings?')){
          try {
            const formData = editable.value
            accountService.editAccount(formData)
            Pop.success('User Settings Saved')
          } catch (error) {
            logger.error(error)
            Pop.error(error)
          }
        }
      }

    }
  }
}
</script>

<style scoped>
img {
  width: 150px;
  aspect-ratio: 1/1;
  object-fit: cover;
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
