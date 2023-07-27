import { AppState } from "../AppState"
// import { FoodItem } from "../models/FoodItem.js"
import { ActiveRecipe, Recipe } from "../models/Recipe"
import { logger, logging } from "../utils/Logger"
// import Pop from "../utils/Pop.js"
import { api, spoonacular } from "./AxiosService"

class RecipesService {

    // NOTE this function is not needed as the post does double duty

    // async deleteFavorite(recipeId) {
    //     logging.warn(`[deleteFavorite(${recipeId})]`)
    //     const res = await api.delete(`api/recipes/${recipeId}`)
    //     logger.log(res.data, 'deleted')
    //     AppState.favoriteRecipes = AppState.favoriteRecipes.filter(f => f.id != recipeId)
    // }

    async favoriteRecipe() {
        // TODO find all instances where this is called, rename them then debug this
            logging.warn(`[favoriteRecipe(${arguments})]`)
        let req = null
        if(!arguments){
            req = { recipeId: AppState.activeRecipe.recipeId }
        }else{
            req = { recipeId: arguments[0] }
        }
            logging.log('The request being sent up to the api is:', req)
        const res = await api.post(`api/favorites`, req)
            logging.log('The response from the api is:', res.data)
        // TODO not entirely sure why this is here, se if I can fix it later
        AppState.favoriteRecipes = []
        AppState.favoriteRecipes.push(new Recipe(res.data))
            logging.log('The favorite recipes in the appstate are now:', AppState.favoriteRecipes)
    }

    async getMyFavoriteRecipes(){
            logging.warn(`[getMyFavoriteRecipes(${arguments})]`)
        if(!AppState.apiOn){
            AppState.favoriteRecipesWithDetails = [] 
            return 
        }
        const res = await api.get(`api/favorites/${AppState.account.id}/user`)
            logging.log('The favorite recipes from api are:', res.data)
        AppState.favoriteRecipes = res.data
        let details = await this.getRecipeInformation(res.data)
            logging.log('Favorite recipes details from api:', details)

        AppState.favoriteRecipesWithDetails = details.data.map( r => new ActiveRecipe(r))
            logging.log('The mapped recipes are:', AppState.favoriteRecipesWithDetails)

    }

    async getActiveRecipeFromApi(route){
            logging.warn(`[getActiveRecipeFromApi(${route})]`)
        const res = await spoonacular.get(`/${route}/information?includeNutrition=false`)
            logging.log('The response from the api is:', res.data)
        AppState.activeRecipe = new ActiveRecipe(res.data)
            logging.log('The active recipe is now:', AppState.activeRecipe)
    }

    async getRecipesFromSpoonacular(ingredients){
            logging.warn(`[getRecipesFromSpoonacular(${ingredients})]`)
        if(!AppState.apiOn){
                logging.error('Api is turned off, aborting function')
            AppState.spoonacularRecipesWithDetails = [] 
            return 
        }
        const res = await spoonacular.get(`/findByIngredients?ingredients=${ingredients}`)
        // const res = await spoonacular.get(`/complexSearch?diet=${diets}&includeIngredients=${ingredients}&fillIngredients=true&number=15`)
            logging.log('The response from the api is:', res.data)
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
            logging.log('The mapped data in the AppState is now:', AppState.spoonacularRecipes)
        let details = await this.getRecipeInformation( AppState.spoonacularRecipes )
        AppState.spoonacularRecipesWithDetails = details.data.map( r => new ActiveRecipe(r))
            logging.log('The mapped data in the AppState is now:', AppState.spoonacularRecipesWithDetails)
    }

    async getRecipeInformation(recipes){
            logging.warn(`[getRecipeInformation(${recipes})]`)
        let idList = ''
        for (let i = 0; i < recipes.length; i++){
            if(i!=0){ idList+= "," }
            idList += recipes[i].recipeId
        }
            logging.log('The list of ids being sent up for details is:', idList)
        const res = await spoonacular.get(`/informationBulk?ids=${idList}&includeNutrition=false`)
            logging.log('The recipe details from the api are:', res.data)
        return res
    }

    // async checkRecipePreferences(recipes) {
    //     let preferenceRecipes = []
    //     let account = AppState.account
    //     // recipes.forEach(r => {
    //     //     if(r.glutenFree == account.glutenFree) {
    //     //         if(r.vegetarian == account.vegetarian) {
    //     //             if(r.vegan == account.vegan) {
    //     //                 if(r.dairyFree == account.dairyFree) {
    //     //                     if(r.lowCarb == account.lowCarb) {
    //     //                         preferenceRecipes.push(new Recipe(r))
    //     //                     }
    //     //                 }
    //     //             }
    //     //         }
    //     //     }
    //     // })
    //     AppState.accountSelectedRecipes = preferenceRecipes
    //     logger.log(account)
    //     logger.log('preference recipes in appstate', AppState.accountSelectedRecipes)
    // }

    async getRandomRecipe() {
            logging.warn(`[getRandomRecipe(${arguments})]`)
        const res = await spoonacular.get('https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian')
            logging.log('The response from the api is:', res.data)
        AppState.homeRecipe = res.data
    }
}

export const recipesService = new RecipesService()