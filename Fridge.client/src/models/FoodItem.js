export class ApiFoodItem{
    constructor(data){
        this.foodItemId = data.foodItemId
        this.name = data.name || 'Not Found'
        this.quantity = data.quantity || 0
        this.unit = data.measurementUnit || data.unit || 'Piece'
        this.type = data.type || ''
        this.serving_qty = data.serving_qty || 0
        this.common_type = data.common_type || ''
        this.storageType = data.storageType || 'Pantry'
        this.archived = data.archived || false
        this.inCart = false
        this.shoppingQty = data.shoppingQty || 0
        this.photo = data.photo || 'src/assets/img/default_2.jpg'
    }
}

export class FoodItem extends ApiFoodItem{
    constructor(data){
      super(data)
      this.id = data.id
      this.accountId = data.accountId
    }
  }