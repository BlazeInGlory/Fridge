import { unitsConversionService } from "../services/UnitsConversionService"

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
        this.summary = data.summary || {}
        this.ingredients = this.computeIngredients(data.extendedIngredients) || []
        this.prepTime = data.readyInMinutes || 0
        this.servings = data.servings || 1
        this.origRecipe = data.sourceUrl || '#'
    }

    computeIngredients(data){
        let output = []
        for(let i=0; i<data.length;i++){
            let amount = Math.ceil(data[i].measures.us.amount)
            let original = data[i].original
            let name = data[i].name
            let unitUs = unitsConversionService.computeBaseUnit(data[i].measures.us.unitShort) || 'piece'
            let unitMetric = unitsConversionService.computeBaseUnit(data[i].measures.metric.unitShort) || 'piece'

            output.push({amount, original, name, unitUs, unitMetric})
        }
        return output
    }
}