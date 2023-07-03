export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture || 'none',
    this.glutenFree = data.glutenFree || false,
    this.vegetarian = data.vegetarian || false,
    this.vegan = data.vegan || false,
    this.dairyFree = data.dairyFree || false,
    this.lowCarb = data.lowCarb || false
    this.favoriteRecipes = data.favoriteRecipes || []
  }
}