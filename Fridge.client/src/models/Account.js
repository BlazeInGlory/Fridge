export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // NOTE diet is an enum
    this.diet = data.diet
    // TODO add additional properties if needed
  }
}
