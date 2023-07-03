import { AppState } from "../AppState"
import { FoodItem } from "../models/FoodItem.js"
import { ActiveRecipe, Recipe } from "../models/Recipe"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop.js"
import { api, spoonacular } from "./AxiosService"

class RecipesService {

    async deleteFavorite(recipeId) {
        const res = await api.delete(`api/recipes/${recipeId}`)
        logger.log(res.data, 'deleted')
        AppState.favoriteRecipes = AppState.favoriteRecipes.filter(f => f.id != recipeId)
    }

    async favoriteRecipe() {
        let req = { recipeId: AppState.activeRecipe.recipeId }

        if(AppState.logging){logger.log(req)}
        const res = await api.post(`api/favorites`, req)
        if(AppState.logging){logger.log(res.data)}
        AppState.favoriteRecipes = []
        AppState.favoriteRecipes.push(new Recipe(res.data))
    }
    async getMyFavoriteRecipes(){
        const res = await api.get('api/recipes')
        if(AppState.logging){logger.log(res.data, 'favorite recipes from api')}
        // let details = await this.getRecipeInformation
        // AppState.spoonacularRecipesWithDetails = details.data.map( r => new Recipe(r))

    }

    async getActiveRecipeFromApi(route){
        const res = await spoonacular.get(`/${route}/information?includeNutrition=false`)
        if(AppState.logging){logger.log(res.data)}
        AppState.activeRecipe = new ActiveRecipe(res.data)
        logger.log(AppState.activeRecipe)
    }


    async getRecipesFromSpoonacular(ingredients){
        if(!AppState.apiOn){
            AppState.spoonacularRecipes = [] 
            return 
        }
        const res = await spoonacular.get(`/findByIngredients?ingredients=${ingredients}`)
        // const res = await spoonacular.get(`/complexSearch?diet=${diets}&includeIngredients=${ingredients}&fillIngredients=true&number=15`)
        if (AppState.logging){ logger.log(res) }
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
        if (AppState.logging){logger.log( AppState.spoonacularRecipes) }
        let details = await this.getRecipeInformation( AppState.spoonacularRecipes )
        AppState.spoonacularRecipesWithDetails = details.data.map( r => new Recipe(r))

    }

    async getRecipeInformation(recipes){
        let idList = ''
        for (let i = 0; i < AppState.spoonacularRecipes.length; i++){
            if(i!=0){ idList+= "," }
            idList += recipes[i].recipeId
        }
        const res = await spoonacular.get(`/informationBulk?ids=${idList}&includeNutrition=false`)
        if (AppState.logging){ logger.log('The recipe details from the api are:', res.data) }
        return res
        
        }

    async getRandomRecipe() {
        const res = await spoonacular.get('https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian')
        if(AppState.logging){logger.log(res.data)}
        AppState.homeRecipe = res.data
    }
}

export const recipesService = new RecipesService()