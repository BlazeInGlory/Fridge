import { unitsConversionService } from "../services/UnitsConversionService"

export class Ingredient{
    constructor(data){
        this.name = data.nameClean
        this.amount = Math.ceil(data.measures.us.amount)
        this.unitUs = unitsConversionService.computeBaseUnit(data.measures.us.unitShort) || 'pcs'
    }
}