import { reactive } from 'vue'
// import { FoodItem } from './models/FoodItem.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/FoodItem.js').FoodItem[]} */
  foodList: [
    // new FoodItem({
    //   common_type: 'idk',
    //   food_name: "salsa",
    //   photo: {
    //     thumb: "https://nix-tag-images.s3.amazonaws.com/219_thumb.jpg"
    //   },
    //   serving_qty: 2,
    //   serving_unit: "tbsp, tsp",
    //   tag_id: "219",
    //   tag_name: "salsa"
    // })
  ],
  /** @type {import('./models/FoodItem.js').FoodItem} */
  pantry: null,
  spoonacularRecipes: null,
  favoriteRecipes: null,
  shopping: false,
  activeSelection: {},
  apiOn: true,
  logging: true,
})
