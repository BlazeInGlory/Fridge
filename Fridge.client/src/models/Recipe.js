import { Ingredient } from "./Ingredient"

export class Recipe{
    constructor(data){
        this.id = data.recipeId || data.id
        this.recipeId = data.recipeId || data.id
        this.name = data.title || ''
        this.image = data.image || ''
        this.vegetarian = data.vegetarian || false
        this.vegan = data.vegan || false
        this.glutenFree = data.glutenFree || false
        this.dairyFree = data.dairyFree || false
        this.lowCarb = data.lowFodMap || false
        this.prepTime = data.readyInMinutes || 1
        this.types = data.dishTypes || []
    }
}

export class ActiveRecipe extends Recipe{
    constructor(data){
        super(data)
        this.steps = data.analyzedInstructions[0].steps || []
        this.summary = data.summary || {}
        this.prepTime = data.readyInMinutes || 0
        this.servings = data.servings || 1
        this.origRecipe = data.sourceUrl || '#'
        this.ingredients = this.mapIngredients(data.extendedIngredients)|| []
    }

    mapIngredients(data){
        let output = []
        for(let i=0; i<data.length;i++){
            const ingredient = new Ingredient(data[i])
            output.push(ingredient)
        }
        return output
    }
}