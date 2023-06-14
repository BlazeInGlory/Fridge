<template>
  <nav class="d-flex justify-content-center">
    <div class="d-flex flex-row justify-content-center menu">
        
        <div class="link">
          <router-link :to="{ name: 'Pantry' }" class="selector">
            <div class="link-img"> <img src="../assets/img/ingredients.svg" alt="pantry"> </div>
            <div class="link-text"> PANTRY </div>
          </router-link>
        </div>
        
        <div class="link">
          <router-link :to="{ name: 'Recipes' }" class="selector">
            <div class="link-img"> <img src="../assets/img/recipe.svg" alt="recipe"> </div>
            <div class="link-text"> RECIPES </div>
          </router-link>
        </div>

        <div class="logo-container">
          <router-link :to="{ name: 'Home' }">
              <img class="logo" alt="logo" src="../assets/img/logo.svg"/>
          </router-link>
        </div>
        
        <div class="link">
          <router-link :to="{ name: 'Grocery' }" class="selector">
            <div class="link-img"> <img src="../assets/img/grocery_list.svg" alt="list"> </div>
            <div class="link-text"> GROCERY </div>
          </router-link>
        </div>
        
        <div class="link">
          <div type="button" v-if="!user.isAuthenticated" @click="login" class="selector"> 
            <div class="link-img"> <img src="../assets/img/login.svg" alt="list"> </div>
            <div class="link-text"> LOGIN </div>
          </div>
          <router-link :to="{ name: 'Account' }" class="selector">
            <div class="link-img"> <img src="../assets/img/login.svg" alt="list"> </div>
            <div class="link-text"> ACCOUNT </div>
          </router-link>
        </div>
          
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
}
</script>

<style scoped>
/* TODO logging in shifts margin by a little bit, fix that in a future update */
.link .router-link-exact-active {
  border-bottom:10px solid #FFCA4B !important ;
}
nav {
  padding: 1.4rem 0 0 0;
  background-image: url(../assets/img/border-pattern-top.svg);
  background-size: 6rem;
  background-position-x: center;
  background-position-y: top;
  background-repeat: repeat-x;
  max-height: 6rem;
}
.menu{
  background-color: white;
  height: inherit;
  width: 100%;
}
.logo-container{
  background: black;
  margin-top: -4rem;
  border-radius: 50% 50% 0 0;
  width: 20%;
  min-width: 100px;
  max-width: 140px;
}
.logo-container a{
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 1rem 0.25rem 1rem;
  height: 100%;
  width: 100%;
}
.logo{
 width: 100%;
}
.link{
  padding: 0 0.25rem;
  flex-grow: 1;
  font-family: 'Oswald', sans-serif;
}
.link .selector{
  display: flex;
  border-bottom: 10px solid transparent ;
  color: black;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.link-img{
  flex-grow: 1;
}
.link-img img{
  height: 100%;
}
.link-text{
  flex-grow: 1;
}
.logo-container img{
  width: 100%;
}
@media screen and (max-width: 370px) { .logo-container{ display: none; } }
@media screen and (max-width: 580px) { .logo-container{   margin-top: -3.5rem; } }
@media screen and (max-width: 515px) { .logo-container{   margin-top: -3rem; } }
</style>
