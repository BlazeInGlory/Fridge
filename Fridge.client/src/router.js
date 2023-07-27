import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('PantryPage'),
    beforeEnter: authGuard
  },
  {
    path: '/pantry',
    name: 'Pantry',
    component: loadPage('PantryPage'),
    beforeEnter: authGuard
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: loadPage('RecipesPage'),
    beforeEnter: authGuard
  },
  {
    path: '/recipes/:id',
    name: 'ActiveRecipe',
    component: loadPage('ActiveRecipePage'),
    beforeEnter: authGuard
  },
  {
    path: '/grocery',
    name: 'Grocery',
    component: loadPage('GroceryPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
