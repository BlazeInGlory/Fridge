export class ApiFoodItem{
    constructor(data){
        this.foodItemId = data.foodItemId
        this.name = data.name || 'Not Found'
        this.quantity = data.quantity || 0
        this.unit = this.computeUnit(data) || 'Units'
        this.type = data.type || ''
        this.serving_qty = data.serving_qty || 0
        this.common_type = data.common_type || ''
        this.storageType = data.storageType || 'Pantry'
        this.archived = data.archived || false
        this.inCart = false
        this.shoppingQty = data.shoppingQty || 0
        this.photo = data.photo || 'src/assets/img/default_2.jpg'
    }

    computeUnit(data){
      const unit = data.measurementUnit || data.unit
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

export class FoodItem extends ApiFoodItem{
    constructor(data){
      super(data)
      this.id = data.id
      this.accountId = data.accountId
    }
  }