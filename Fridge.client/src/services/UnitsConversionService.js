import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class UnitsConversionService {
    computeBaseUnit(unit){
        let brk = false
        let i = 0
        let output = ''
        const measures = ['dash', 'teaspoon', 'teaspoons', 'tsp', 'tablespoon', 'tablespoons', 'tbsp', 'cup', 'cups', 'c', 'gallon', 'quart', 'quarts', 'qt', 'pint', 'pints', 'pt', 'ounce', 'ounces', 'oz', 'gram', 'grams', 'g', 'pound', 'lb', 'fl oz', 'fluid ounce', 'fluid ounces', 'liter', 'ml', 'milliliter']
  
        while(!brk){
          if(unit[i] == '.' || 
          unit[i] == ' ' || 
          unit[i] == ',' || 
          i >= unit.length-1){
            brk = true
          }
          output += unit[i]; i++;
        }
        if(measures.find(m => m == output)){
          return output
        }else{
          return 'piece'
        }
      }

      makeRecipe(ingredients){
        let inPantry = []
        
        // finds the first result for each ingredient then adds it to to the
        // inPantry array
        for (let i=0; i < ingredients.length; i++){
          let ingredient = this.computeSearchName(ingredients[i].name)
          let firstResult = []
          AppState.pantry.forEach(f => {
            if( f.name.toLowerCase().includes( ingredient.toLowerCase() ) ) {
              firstResult.push(f)
            }
          })
          // if there is a result that was added to the array, 
          // then push the first one to the inPantry
          if(firstResult.length>0){ inPantry.push(firstResult[0]) }
        }
        
        logger.log(inPantry)

      }

      computeSearchName(ingredient){
        logger.log('the ingredient passed to the compute is:', ingredient)
        
        let output = ''
        let dividedIngredient = ingredient.split(' ')
        logger.log('the split ingredient is:', dividedIngredient)
        
        if(dividedIngredient.length > 1){
          output = dividedIngredient[1]
        }
        output = dividedIngredient[0]

        logger.log('the returned value is:', output)
        return output
      }
}

export const unitsConversionService = new UnitsConversionService()