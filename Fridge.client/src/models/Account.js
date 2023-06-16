export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // NOTE diet is an enum
    this.diet = data.diet
    this.dietPreference = data.dietPreference
    // TODO add additional properties if needed
  }
}
