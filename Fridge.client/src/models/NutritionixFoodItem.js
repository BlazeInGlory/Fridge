export class NutritionixFoodItem{
    constructor(data){
        this.name = data.food_name
        this.foodItemId = data.tag_id
        this.unit = this.computeUnit(data.serving_unit)
        this.photo = data.photo.thumb
        this.quantity = data.quantity || 0
        this.archived = false
    }

    computeUnit(unit){
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
}