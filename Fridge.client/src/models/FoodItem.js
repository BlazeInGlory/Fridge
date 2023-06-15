export class FoodItem{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.foodItemId = data.foodItemId
        this.name = data.name 
        this.quantity = data.quantity || 0
        this.unit = data.measurementUnit 
        this.type = data.type || ''
        this.food_name = data.food_name
        this.serving_qty = data.serving_qty || 0
        this.serving_unit = data.serving_unit
        this.common_type = data.common_type || ''
        this.storageType = data.storageType || 'Pantry'
        this.archived = data.archived || false
        this.inCart = false
        this.shoppingQty = data.shoppingQty || 0
        this.photo = data.photo
        this.tag_id = data.tag_id
    }
}