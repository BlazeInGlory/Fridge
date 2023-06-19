export class Recipe{
    constructor(data){
        this.id = data.id
        this.name = data.title
        this.image = data.image
        this.missingIngredients = data.missedIngredients || ''
        this.usedIngredients = data.usedIngredients || ''
    }
}

export class ActiveRecipe extends Recipe{
    constructor(data){
        super(data)
        this.steps = data.analyzedInstructions[0].steps || []
        this.summary = data.summary || ''
        this.ingredients = data.extendedIngredients || []
        this.prepTime = data.readyInMinutes || 0
        this.servings = data.servings || 1
        this.origRecipe = data.sourceUrl || '#'
    }
}