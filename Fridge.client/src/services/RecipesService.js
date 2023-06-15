import { AppState } from "../AppState"
import { Recipe } from "../models/Recipe"
import { logger } from "../utils/Logger"
import { spoonacular } from "./AxiosService"

class RecipesService {
    async getRecipesFromSpoonacular(ingredients){
        const res = await spoonacular.get(`/findByIngredients?ingredients=${ingredients}`)
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
        logger.log(AppState.spoonacularRecipes)
    }
}

export const recipesService = new RecipesService()