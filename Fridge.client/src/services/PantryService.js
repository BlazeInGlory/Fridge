import { logger } from "../utils/Logger"
import { api, nutritionix } from "./AxiosService"

class PantryService{
    async searchFood(search){
        const res = await nutritionix.get(`/instant?query=${search}`)
        logger.log(res.data.common)
    }
    async getMyPantry(){
        const res = await api.get('api/pantry')
        logger.log(res)
    }
    async deleteThisFoodForever(id){
        const res = await api.delete(`api/pantry/${id}`)
        logger.log(res.data)
    }
}
export const pantryService = new PantryService()