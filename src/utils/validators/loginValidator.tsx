import * as Yup from "yup";
import definitions from "../definitions";

const testValidator = Yup.object().shape({
  email: Yup.string()
    .required(definitions.Messages.required)
    .email(definitions.Messages.email)
    .max(150, definitions.Messages.max(150)),
  password: Yup.string()
    .required(definitions.Messages.required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      definitions.Messages.weekPass
    )
    .min(8, definitions.Messages.min(8)),
});

export default testValidator;
