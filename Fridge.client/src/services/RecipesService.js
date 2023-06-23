import { AppState } from "../AppState"
import { ActiveRecipe, Recipe } from "../models/Recipe"
import { logger } from "../utils/Logger"
import { spoonacular } from "./AxiosService"

class RecipesService {
    async getRecipesFromSpoonacular(ingredients){
        if(!AppState.apiOn){
            AppState.spoonacularRecipes = [] 
            return 
        }
        const res = await spoonacular.get(`/findByIngredients?ingredients=${ingredients}&number=10&ranking=2&ignorePantry=true`)
        if (AppState.logging){ logger.log(res) }
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
        if (AppState.logging){logger.log( AppState.spoonacularRecipes) }
    }

    async getActiveRecipeFromApi(route){
        const res = await spoonacular.get(`/${route}/information?includeNutrition=false`)
        logger.log(res.data)
        AppState.activeRecipe = new ActiveRecipe(res.data)
        logger.log(AppState.activeRecipe)
    }

    async getMyFavoriteRecipes(){
        // TODO add in the get my favorite recipes
        logger.log('no method implemented: getMyFavoriteRecipes()')
    }
}

export const recipesService = new RecipesService()