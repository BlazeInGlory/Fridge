import { reactive } from 'vue'
import { FoodItem } from './models/FoodItem.js'

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
  pantry: [
    new FoodItem({
      id: 'dummyData1',
      accountId: 'dummyAccount',
      foodItemId: 'dummyApiData1',
      name: 'apples', 
      quantity: 0,
      unit: 'piece',
      type: 'produce',
      storageType: 'Pantry',
      archived: false
    }),
    new FoodItem({
      id: 'dummyData2',
      accountId: 'dummyAccount',
      foodItemId: 'dummyApiData2',
      name: 'chicken breasts', 
      quantity: 3,
      unit: 'piece',
      type: 'meat',
      storageType: 'Pantry',
      archived: false
    }),
    new FoodItem({
      id: 'dummyData3',
      accountId: 'dummyAccount',
      foodItemId: 'dummyApiData3',
      name: 'Pop-Tarts', 
      quantity: 2,
      unit: 'piece',
      type: 'produce',
      storageType: 'Pantry',
      archived: true
    }),
    new FoodItem({
      id: 'dummyData4',
      accountId: 'dummyAccount',
      foodItemId: 'dummyApiData4',
      name: 'Baby Bella Mushrooms', 
      quantity: 6,
      unit: 'oz',
      type: 'vegetable',
      storageType: 'Fridge',
      archived: false
    }),
    new FoodItem({
      id: 'dummyData5',
      accountId: 'dummyAccount',
      foodItemId: 'dummyApiData5',
      name: 'Bell Peppers', 
      quantity: 0,
      unit: 'piece',
      type: 'produce',
      storageType: 'Fridge',
      archived: true
    }),
  ],
  spoonacularRecipes: null,
  favoriteRecipes: null,
  shopping: false,
})
