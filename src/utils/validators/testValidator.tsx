import * as Yup from 'yup'
import definitions from '../definitions'

const testValidator = Yup.object().shape({
  id: Yup.string().required(definitions.Messages.required),
  name: Yup.string().required(definitions.Messages.required).max(150, definitions.Messages.max(150)),
  age: Yup.string().nullable().max(2, definitions.Messages.max(2)),
})

export default testValidator
