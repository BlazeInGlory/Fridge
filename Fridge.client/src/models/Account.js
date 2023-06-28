export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture || 'none'
    this.dietPreference = data.dietPreference
    // TODO add additional properties if needed
  }
}