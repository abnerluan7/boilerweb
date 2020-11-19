export interface FieldValidation {
  field: string
  validate: (input: FieldValidation.Params) => Error
}

export namespace FieldValidation {
  export type Params = {
    [field: string]: string
  }
}
