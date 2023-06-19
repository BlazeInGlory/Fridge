export class NutritionixFoodItem{
    constructor(data){
        this.name = data.food_name
        this.foodItemId = data.tag_id
        this.unit = data.serving_unit
        this.photo = data.photo.thumb
        this.quantity = 0
    }
}