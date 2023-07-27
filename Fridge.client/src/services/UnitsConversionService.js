import { AppState } from "../AppState"
import { dePluralizer } from "../utils/DePluralizer"
import { logging } from "../utils/Logger"
// import Pop from "../utils/Pop"
import { pantryService } from "./PantryService"

class UnitsConversionService {
    computeBaseUnit(unit){
            logging.warn(`[computeBaseUnit(${unit})]`)
        let brk = false
        let i = 0
        let output = ''
        const measures = ['dash', 'pinch', 'teaspoon', 'tsp', 'tablespoon', 'tbsp', 'cup', 'c', 'gallon', 'gal', 'G', 'quart', 'qt', 'pint', 'pt', 'ounce', 'oz', 'gram', 'g', 'pound', 'lb', 'fl oz', 'fluid ounce', 'liter', 'l', 'ml', 'milliliter']
  
        // grab all the letters in the param until we hit either a space, a comma or a period
        while(!brk){
          if(unit[i] == '.' || 
          unit[i] == ' ' || 
          unit[i] == ',' || 
          i >= unit.length-1){ brk = true }

        //   dashes is a weird plural, so just set its non-plural form here and gallon is the only unit we
        //  are dealing with that has a capitol
          if(output == 'dashes'){
            output == 'dash'
          }else if(output == 'G'){
            output == 'gallon'
          }else{
            output += unit[i]; i++;
          }
        }
        output = dePluralizer.lower(output)
        if(measures.find(m => m == output)){
            return this.computeBaseUnitAcronym(output)
        }else{
            return 'pcs'
        }
    }

    computeBaseUnitAcronym(measure){
        logging.warn(`[computeBaseUnitAcronym(${measure})]`)
        let output = ''
        switch (measure.toLowerCase()) {
            case 'dash':
                output = 'dash';
                break;
            case 'pinch':
                output = 'pinch';
                break;
            case 'teaspoon':
            case 'teaspoons':
            case 'tsp':
            case 'tsps':
                output = 'tsp';
                break;
            case 'tablespoon':
            case 'tablespoons':
            case 'tbsp':
            case 'tbsps':
                output = 'tbsp';
                break;
            case 'cup':
            case 'cups':
            case 'c':
                output = 'cup';
                break;
            case 'gallon':
            case 'gallons':
                output = 'gal';
                break;
            case 'quart':
            case 'quarts':
            case 'qt':
            case 'qts':
                output = 'qt';
                break;
            case 'pint':
            case 'pints':
            case 'pt':
            case 'pts':
                output = 'pt';
                break;
            case 'ounce':
            case 'ounces':
            case 'oz':
            case 'ozs':
                output = 'oz';
                break;
            case 'gram':
            case 'grams':
            case 'g':
            case 'gs':
                output = 'g';
                break;
            case 'kilogram':
            case 'kilograms':
            case 'kilo':
            case 'kilos':
            case 'k':
            case 'ks':
                output = 'k';
                break;
            case 'pound':
            case 'pounds':
            case 'lb':
            case 'lbs':
                output = 'lb';
                break;
            case 'fluid ounce':
            case 'fluid ounces':
            case 'fl oz':
            case 'fl ozs':
                output = 'fl oz';
                break;
            case 'milliliter':
            case 'milliliters':
            case 'ml':
            case 'mls':
                output = 'ml';
                break;
            case 'liter':
            case 'liters':
            case 'l':
            case 'ls':
                output = 'l';
                break;
            default:
                output = 'pcs';
                break;
        }
        return output
    }

    convertLargerUnitsToMl(qty, inputUnit){
        // debugger
            logging.warn(`[convertLargerUnitsToMl(${qty}, ${inputUnit})]`)
        // NOTE because fluid ounce has a space in the abbreviation, we need to
        // replace that space with an underscore, otherwise this wouldn't be needed
        let unit = inputUnit
        if(unit == 'fl oz'){ unit = 'fl_oz' }
        if(unit == 'pc' || unit == 'pcs'){ return qty }
        const ml = {
            ml: 1,
            g: 1,
            oz: 29,
            lb: 448,
            k: 1000,
            l: 1000,
            tsp: 5,
            tbsp: 15,
            cup: 240,
            pt: 480,
            qt: 950,
            gal: 3800,
            pinch: 1,
            dash: 0.5,
            fl_oz: 29
        }
        let converted = qty * ml[unit]
        return converted
    }

    convertFromMlToLargerUnits(qty, outputUnit){
            logging.warn(`[convertFromMlToLargerUnits(${qty}, ${outputUnit})]`)
        let unit = outputUnit
        if(unit == 'fl oz'){ unit = 'fl_oz' }
        if(unit == 'pc' || unit == 'pcs'){
            if (qty<1){ return 0 }
            return qty
        }
        const ml = {
            ml: 1,
            g: 1,
            oz: 29,
            lb: 448,
            k: 1000,
            l: 1000,
            tsp: 5,
            tbsp: 15,
            cup: 240,
            pt: 480,
            qt: 950,
            gal: 3800,
            pinch: 1,
            dash: 0.5,
            fl_oz: 29
        }
        let converted = (Math.floor( (qty*100) / ml[unit] ))/100
        if(converted<1){
            return 0
        }
        return converted
    }

    async makeRecipe(ingredients){
        // debugger
            logging.warn(`[makeRecipe(${ingredients})]`)
        // NOTE this stops the function from proceeding if it is still trying to make another recipe
        if(AppState.makingRecipe){ 
            logging.warn('Already making a recipe, returning from the function')
            return 
        }
        AppState.makingRecipe = true
        let computedIngredients = this.getMatchingIngredientsFromAppState(ingredients)

        for(let i = 0; i<computedIngredients.length; i++){
            // Aliasing out these long things
            let pantryUnit = computedIngredients[i].unitInPantry
            let pantryNum = computedIngredients[i].qtyInPantry
            let subUnit = computedIngredients[i].removeUnit
            let subNum = computedIngredients[i].qtyToRemove
            let newPantryAmount = 0

                logging.log('the pantry ingredients being changed are:', computedIngredients[i])

            // if the unit in the pantry is a piece, then conversion math isn't really needed
            // so do another calculation
            if(pantryUnit == 'piece' || pantryUnit == 'pcs' || pantryUnit == 'pc'){
                // if the 
                if(subUnit == 'piece' || subUnit == 'pcs' || subUnit == 'pc'){
                    // if the units do match, then subtract here
                    newPantryAmount = pantryNum - subNum
                        logging.log('The new amount in the AppState will now be:', newPantryAmount)
                }
                else{
                    // default to subtracting 1 if the units do not match, not perfect but a balanced
                    // solution I guess
                    newPantryAmount = (pantryNum - 1)
                }
            }else{
                // if the units are convert compatible, then convert the units to ml
                // and subtract those amounts, then convert them back
                let subInMl = this.convertLargerUnitsToMl(subNum, subUnit)
                let pantryInMl = this.convertLargerUnitsToMl(pantryNum, pantryUnit)
                newPantryAmount = this.convertFromMlToLargerUnits( pantryInMl - subInMl, pantryUnit)
                    logging.log('The new amount in the AppState will now be:', newPantryAmount)
            }

// NOTE this is commented out to disable database update, this is purely for debugging and writing out expandability
// TODO uncomment this line out once the function is fully working
                logging.log('Setting', computedIngredients[i], 'to', newPantryAmount)
            await pantryService.setPantryQuantity( newPantryAmount, computedIngredients[i].foodItemId)
        }
            logging.log('subtracted all found items from pantry')
        AppState.makingRecipe = false
        return true
        
    }

    getMatchingIngredientsFromAppState(ingredients){
            logging.warn(`[getMatchingIngredientsFromAppState(${ingredients})]`)

        let inPantry = []

            logging.log('The ingredients passed into the function are', ingredients)

        // finds the first result for each ingredient then adds it to to the
        // inPantry array
        for (let i=0; i < ingredients.length; i++){
            // the number of characters to check against in the while's for loop, 
            // it is here so it resets every instance of the for loop
            let wordChars = 1
            // this is what the while loop checks against, it is here so
            // that it resets in every instance of the for loop
            let brk = false
            // this sends the ingredient name to another function to determine 
            // if there are error inducing words like frozen or grilled
            // TODO debug this check as I am not entirely certain all ingredients 
            // will output a usable value
            let ingredient = this.computeSearchName(ingredients[i].name)
        
                logging.log('Starting while loop 1 in makeRecipe')

            while(!brk){
                let result = []
                let ingredientWithLimitedChars = ''

                // this pushes the characters of the string to the limited char variable
                // then increases the number of characters to search until we get a single result
                for(let j = 0; j < wordChars; j++){
                    ingredientWithLimitedChars += ingredient[j]
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
                if ( result.length <= 1 || wordChars > ingredient.length ){
                    // push the first result, which should be the ingredient 
                    // who is closes to spoiling, if there is one, to the inPantry
                    if(result.length>0 
                        && this.ingredientSanityCheck(ingredient ,result[0].name) 
                        && !result[0].archived
                        && result[0].quantity > 0
                        ){ 
                        inPantry.push({
                            name: result[0].name,
                            foodItemId: result[0].foodItemId,
                            qtyInPantry: result[0].quantity,
                            unitInPantry: result[0].unit,
                            qtyToRemove: ingredients[i].amount,
                            removeUnit: ingredients[i].unitUs
                        }) 
                        
                            logging.log('pushing the value of:', result[0], 'to the inPantry array. The search that lead to this is:', ingredientWithLimitedChars)
                    
                    }else{

                        logging.log('No results found')
                    
                    }
                    brk = true
                }
            }

                logging.log('Ending while loop')

    }
    
        logging.log('The items found in the pantry are:',inPantry)

    return inPantry

    }

    // TODO this compute may not return good search data, increase search parameter to return
    // data that is ensured to be good, perhaps through a nutritionix search? not sure
    // for now this is set to eliminate the first word of the string and return only the second
    // ie will remove 'grilled' from 'grilled chicken', but could be an issue for something like
    // 'artichoke hearts' where the focus word is artichoke and not hearts, which could lead to
    // improper search results like returning 'chicken hearts' or something
    computeSearchName(ingredient){
            logging.warn(`[computeSearchName(${ingredient})]`)
            logging.log('the ingredient passed to the compute is:', ingredient)
    
        let output = ''
        let dividedIngredient = this.splitNames(ingredient)

            logging.log('the split ingredient is:', dividedIngredient)
    
        if(dividedIngredient.length > 1){
            output = dividedIngredient[1]
        }else{
            output = dividedIngredient[0]
        }

            logging.log('the returned value is:', output)

        return output
    }

    splitNames(ingredient){
            logging.warn(`[splitNames(${ingredient})]`)
        let dividedIngredient = ingredient.split(' ')
        for (let i = 0; i < dividedIngredient.length; i++) {
            const element = dividedIngredient[i];
            dePluralizer.lower(element)
            dividedIngredient[i] = element
        }
        return dividedIngredient
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

export const unitsConversionService = new UnitsConversionService()