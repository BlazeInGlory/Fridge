import { AppState } from "../AppState"
import { FoodItem } from "../models/FoodItem.js"
import { ActiveRecipe, Recipe } from "../models/Recipe"
import { logger } from "../utils/Logger"
import { spoonacular } from "./AxiosService"

class RecipesService {
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
        this.getRecipeInformation()
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

    async getRecipeInformation(){
        let idList = ''
        let recipes = AppState.spoonacularRecipes
        for (let i = 0; i <= AppState.spoonacularRecipes.length; i++)
        idList += recipes[i].id + ", "
        const res = await spoonacular.get(`/informationBulk?ids=${idList}&includeNutrition=false`)
        AppState.spoonacularRecipes = res.data.map( r => new Recipe(r))
        }

    // async getRandomRecipe() {
    //     const res = await spoonacular.get('https://api.spoonacular.com/recipes/random?number=1')
    //     logger.log(res.data)
    //     AppState.spoonacularRecipes = res.data
    // }
}

export const recipesService = new RecipesService()