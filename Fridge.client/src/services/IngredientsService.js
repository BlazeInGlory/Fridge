
class IngredientsService{
    getMatchingIngredientsInPantry(name){
        let output = []
        output.push(name)
        return output
    }
}

export const ingredientsService = new IngredientsService()