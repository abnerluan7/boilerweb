export class InvalidFieldError extends Error {
  constructor (error: string) {
    super('InvalidFieldError')
    this.name = 'InvalidFieldError'
    this.message = error
  }
}
