import { AppState } from "../AppState"
import { Recipe } from "../models/Recipe"
import { logger } from "../utils/Logger"
import { spoonacular } from "./AxiosService"

class RecipesService {
    async getRecipesFromSpoonacular(ingredients){
        if(!AppState.apiOn){
            AppState.spoonacularRecipes = [] 
            return 
        }
        const res = await spoonacular.get(`/findByIngredients?ingredients=${ingredients}`)
        logger.log(res)
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
        logger.log(AppState.spoonacularRecipes)
    }

    async getMyFavoriteRecipes(){
        // TODO add in the get my favorite recipes
        logger.log('no method implemented: getMyFavoriteRecipes()')
    }
}

export const recipesService = new RecipesService()