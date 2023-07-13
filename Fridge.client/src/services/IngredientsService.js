import { AppState } from "../AppState"
import { dePluralizer } from "../utils/DePluralizer"
import { logging } from "../utils/Logger"

class IngredientsService{
    countMissingIngredients(names){
        let output = 0
        for(let i=0; i<names.length; i++){
            if (this.getMatchingIngredientsInPantry(names[i].name).length < 1){
                output++
            }
        }
        return output
    }
    getMatchingIngredientsInPantry(name){
        logging.warn(`[getMatchingIngredientsInPantry(${name})]`)
        
        let output = []
        let split = this.splitNames(name)

        for (let i = 0; i < split.length; i++) {
            let matches = this.matchIngredientWordToPantryItems(split[i])
            if (matches.length>0){
                output.push(matches)
            }
        }

        return output
    }
    splitNames(ingredient){
        logging.warn(`[splitNames(${ingredient})]`)
    let dividedIngredient = ingredient.split(' ')
    let output = []
    for (let i = 0; i < dividedIngredient.length; i++) {
        let element = dePluralizer.lower(dividedIngredient[i]);
        output.push(element)
    }
    return output
    }
    matchIngredientWordToPantryItems(word){
        // debugger
            logging.warn(`[matchIngredientNameToPantryItems(${word})]`)

        let inPantry = []

        // finds the first result for the input word then adds it to to the inPantry array
            // the number of characters to check against in the while's for loop, 
            // it is here so it resets every instance of the for loop
            let wordChars = 1
            // this is what the while loop checks against, it is here so
            // that it resets in every instance of the for loop
            let brk = false
        
                logging.log('Starting while loop matchIngredientWordToPantryItems')

            while(!brk){
                let result = []
                let ingredientWithLimitedChars = ''

                // this pushes the characters of the string to the limited char variable
                // then increases the number of characters to search until we get a single result
                for(let j = 0; j < wordChars; j++){
                    ingredientWithLimitedChars += word[j]
                }
                wordChars++
                
                AppState.pantry.forEach(f => {
                    if( f.name.toLowerCase().includes( ingredientWithLimitedChars.toLowerCase() ) ) {
                        result.push(f)
                    }
                })
                // if there is a result that was added to the array, 
                // or the search has no more letters to add to the search param
                // then set the brk to true to end the while
                if ( result.length <= 1 || wordChars > word.length ){
                    // push the first result, which should be the ingredient 
                    // who is closest to spoiling, if there is one, to the inPantry
                    if(result.length>0 
                        && this.ingredientSanityCheck(word, result[0].name) 
                        && !result[0].archived
                        && result[0].quantity > 0
                        ){ 
                        inPantry.push({
                            name: result[0].name,
                            foodItemId: result[0].foodItemId,
                            qtyInPantry: result[0].quantity,
                            unitInPantry: result[0].unit,
                        }) 
                        
                            logging.log('pushing the value of:', result[0], 'to the inPantry array. The search that lead to this is:', ingredientWithLimitedChars)
                    
                    }else if(result.length > 0){
                        logging.log('Multiple results found given input, returning all of them with qty greater than 0')
                        for (let i=0; i<result.length; i++){
                            if(result[i].quantity > 0){
                                inPantry.push(result[i])
                            }
                        }
                    }else{

                        logging.log('No results found')
                    
                    }
                    brk = true
                }
                logging.log('Multiple results found, repeating while loop')

            } logging.log('Ended while loop')
    
        logging.log('The items found in the pantry are:', inPantry)

    return inPantry

    }
    ingredientSanityCheck(searchName, searchResult){
        logging.warn(`[ingredientSanityCheck(${searchName}, ${searchResult})]`)

    let nonPluralSearch = dePluralizer.lower(searchName)
    let nonPluralResult = dePluralizer.lower(searchResult)

        logging.log('The search name was:', searchName, 'The search result was:', searchResult)

    if(!searchResult){ 

            logging.log('There was no search result, therefore returning false')

        return false 
    }
    // if the search parameter includes the result then return true
    if(nonPluralResult.toLowerCase().includes( nonPluralSearch.toLowerCase() )) {

            logging.log('The result matches the search parameter')

        return true
    }
        logging.log('The result does not match the search parameter')

    return false
    }
}

export const ingredientsService = new IngredientsService()