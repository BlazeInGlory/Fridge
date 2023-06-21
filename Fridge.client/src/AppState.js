import { reactive } from 'vue'
// import { FoodItem } from './models/FoodItem.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/FoodItem.js').FoodItem[]} */
  foodList: [],
  /** @type {import('./models/FoodItem.js').FoodItem} */
  pantry: null,

  filteredPantry: null,
  
  spoonacularRecipes: null,
  
  activeRecipe: null,
  
  favoriteRecipes: null,
  
  shopping: false,
  
  activeSelection: {},
  
  apiOn: false,
  
  logging: true,
})
