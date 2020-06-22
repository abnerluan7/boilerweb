import * as Yup from "yup";
import definitions from "../definitions";

export const loginValidator = Yup.object().shape({
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

export const recoveryValidator = Yup.object().shape({
  email: Yup.string()
    .required(definitions.Messages.required)
    .email(definitions.Messages.email)
    .max(150, definitions.Messages.max(150)),
});

export const resetValidator = Yup.object().shape({
  password: Yup.string()
    .required(definitions.Messages.required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      definitions.Messages.weekPass
    )
    .min(8, definitions.Messages.min(8)),
    confirmPassword: Yup.string()
      .required(definitions.Messages.required)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        definitions.Messages.weekPass
      )
      .min(8, definitions.Messages.min(8)),
});


export const signupValidator = Yup.object().shape({
  email: Yup.string()
    .required(definitions.Messages.required)
    .email(definitions.Messages.email)
    .max(150, definitions.Messages.max(150)),
  firstname: Yup.string()
    .required(definitions.Messages.required)
    .max(150, definitions.Messages.max(150)),
  lastname: Yup.string()
    .required(definitions.Messages.required)
    .max(150, definitions.Messages.max(150)),
  password: Yup.string()
    .required(definitions.Messages.required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      definitions.Messages.weekPass
    )
    .min(8, definitions.Messages.min(8)),
});

