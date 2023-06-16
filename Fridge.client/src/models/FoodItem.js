export class ApiFoodItem{
    constructor(data){
        this.foodItemId = data.foodItemId || data.tag_id
        this.name = data.name  || data.food_name
        this.quantity = data.quantity || 0
        this.unit = data.measurementUnit || data.serving_unit || 'Piece'
        this.type = data.type || ''
        this.food_name = data.food_name
        this.serving_qty = data.serving_qty || 0
        this.serving_unit = data.serving_unit || 'Piece'
        this.common_type = data.common_type || ''
        this.storageType = data.storageType || 'Pantry'
        this.archived = data.archived || false
        this.inCart = false
        this.shoppingQty = data.shoppingQty || 0
        this.photo = data.photo || '/src/assets/img/default.jpg'
    }
}

export class FoodItem extends ApiFoodItem{
    constructor(data){
      super(data)
      this.id = data.id
      this.accountId = data.accountId
    }
  }