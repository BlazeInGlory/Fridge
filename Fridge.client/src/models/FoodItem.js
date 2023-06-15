export class FoodItem{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.foodItemId = data.foodItemId
        this.name = data.name 
        this.quantity = data.quantity || 0
        this.unit = data.measurementUnit 
        this.type = data.type || ''
        this.storageType = data.storageType || 'Pantry'
        this.archived = data.archived || false
        this.inCart = false
        this.shoppingQty = data.shoppingQty || 1
    }
}