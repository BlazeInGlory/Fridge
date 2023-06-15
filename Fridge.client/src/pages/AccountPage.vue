<template>
  <div class="about text-center m-5">
    <img class="rounded" :src="account.picture" alt="" />
    <div class="card">
      <h1>Welcome {{ account.name }}</h1>
    <div class="mb-3">
      <label for="url" class="p-3">Choose img from URL</label>
<input type="url" name="url" id="url"
       placeholder="https://example.com"
       pattern="https://.*" size="30">
       <button class="btn btn-success m-1">Submit</button>
</div>
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email Address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" :placeholder="account.email">
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Recipe Preferences:</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
</div>
    <button class ="btn btn-primary" @click="saveChanges">
    <i></i>Save Changes</button>
    <button class="btn btn-dark" @click="Logout">
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
