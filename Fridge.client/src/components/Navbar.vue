<template>
  <nav class="d-flex justify-content-center">
    <div class="d-flex flex-row">
        <div>
          <router-link :to="{ name: 'Pantry' }" class="btn text-success lighten-30 selectable text-uppercase">
            PANTRY
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Recipes' }" class="btn text-success lighten-30 selectable text-uppercase">
            RECIPES
          </router-link>
        </div>
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex flex-column align-items-center">
            <img alt="logo" src="../assets/img/logo.svg" height="45" />
          </div>
        </router-link>
        <div>
          <router-link :to="{ name: 'Grocery' }" class="btn text-success lighten-30 selectable text-uppercase">
            GROCERY
          </router-link>
        </div>
        <div>
          <Login />
        </div>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
nav {
  border-top: 10px solid transparent;
  padding: 15px;
  border-image: url(../assets/img/menu_border_pattern.png) 30 round;
}
@media screen and (min-width: 768px) {
}
</style>
