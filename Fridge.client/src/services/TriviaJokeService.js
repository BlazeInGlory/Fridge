import { spoonacular } from "./AxiosService.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";


class TriviaJokeService {
  async getTriviaFromSpoonacular(){
    const res = await spoonacular.get('https://api.spoonacular.com/food/trivia/random');
    logger.log(res.data)
    AppState.foodTrivia = res.data
  }

  async getJokeFromSpoonacular() {
    const res = await spoonacular.get('https://api.spoonacular.com/food/jokes/random');
    logger.log(res.data)
    AppState.foodJoke = res.data
  }
}

export const triviaJokeService = new TriviaJokeService()