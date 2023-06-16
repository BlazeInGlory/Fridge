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
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.heb.com%2Fis%2Fimage%2FHEBGrocery%2F000375146-1%3F%24article-235-square%24&f=1&nofb=1&ipt=912f7b00b817c2f774cb7a91ee0e145bf8c4b719fff5b2298f403df848007b49&ipo=images',
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
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bowrivermeatmarket.ca%2Fwp-content%2Fuploads%2F2019%2F06%2FSKINLESS-BLESS-CHICKEN-BREASRS-scaled.jpeg&f=1&nofb=1&ipt=894e839093e2cff18210f16f75ec11f6413d86bd58aa0f0fc422f13ed15f539c&ipo=images',
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
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.finedininglovers.com%2Fsites%2Fg%2Ffiles%2Fxknfdk626%2Ffiles%2F2021-06%2Fbaby-bella-mushrooms-facts%25C2%25A9iStock.jpg&f=1&nofb=1&ipt=762519ecab8771e3ecc6831525991d1b3620acd237a4a80ea1f6c838352f30b0&ipo=images',
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
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F3e7798c2-b396-47ca-af17-78dfa3ce2b4a_2.013ab2925acb792bc065227f97aac0da.jpeg&f=1&nofb=1&ipt=4efebb4723719b3866efc9ac49ea4eb8bf028112dcb13364d53584021bf82b24&ipo=images',
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
  activeSelection: {},
  apiOn: false,
})
