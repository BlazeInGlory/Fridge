<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <button class="btn btn-dark" @click="logout">
      <i class="mdi mdi-logout"></i>
      logout
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';
export default {
  setup() {
    return {
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
