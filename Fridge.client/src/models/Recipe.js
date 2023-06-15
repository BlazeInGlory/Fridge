export class Recipe{
    constructor(data){
        this.id = data.id
        this.name = data.title
        this.image = data.image
        this.missingIngredients = data.missedIngredients
        this.usedIngredients = data.usedIngredients
    }
}