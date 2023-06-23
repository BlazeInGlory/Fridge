import { unitsConversionService } from "../services/UnitsConversionService"

export class NutritionixFoodItem{
    constructor(data){
        this.name = data.food_name
        this.foodItemId = data.tag_id
        this.unit = data.unit || unitsConversionService.computeBaseUnit(data.serving_unit) || 'pcs'
        this.photo = data.photo.thumb
        this.quantity = data.quantity || 0
        this.archived = false
    }
}