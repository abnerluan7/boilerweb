export class RequiredFieldError extends Error {
  constructor (error: string) {
    super('RequiredFieldError')
    this.name = 'RequiredFieldError'
    this.message = error
  }
}
