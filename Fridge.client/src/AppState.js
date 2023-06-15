import { reactive } from 'vue'
import { FoodItem } from './models/FoodItem.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/FoodItem.js').FoodItem} */
  pantry: [
    new FoodItem({
      id: 'dummydata1',
      accountId: 'dummyaccount',
      foodItemId: 'dummyapidata1',
      name: 'apples', 
      qty: 0,
      unit: 'piece',
      type: 'produce',
      storageType: 'Pantry',
      archived: false
    }),
    new FoodItem({
      id: 'dummydata2',
      accountId: 'dummyaccount',
      foodItemId: 'dummyapidata2',
      name: 'chicken breasts', 
      qty: 3,
      unit: 'piece',
      type: 'meat',
      storageType: 'Pantry',
      archived: false
    }),
    new FoodItem({
      id: 'dummydata3',
      accountId: 'dummyaccount',
      foodItemId: 'dummyapidata3',
      name: 'Pop-Tarts', 
      qty: 2,
      unit: 'piece',
      type: 'produce',
      storageType: 'Pantry',
      archived: true
    }),
    new FoodItem({
      id: 'dummydata4',
      accountId: 'dummyaccount',
      foodItemId: 'dummyapidata4',
      name: 'Baby Bella Mushrooms', 
      qty: 6,
      unit: 'oz',
      type: 'vegetable',
      storageType: 'Fridge',
      archived: false
    }),
    new FoodItem({
      id: 'dummydata5',
      accountId: 'dummyaccount',
      foodItemId: 'dummyapidata5',
      name: 'Bell Pepers', 
      qty: 0,
      unit: 'piece',
      type: 'produce',
      storageType: 'Fridge',
      archived: true
    }),
  ],
})
