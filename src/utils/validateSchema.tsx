import { Schema, ValidationError } from "yup";

/**
 * Sets property creating parents
 * @prop {object} obj The json object
 * @prop {string} path The name of the property
 * @prop {string} value The value of the property
 */
function setProperty(obj: any, path: string, value: object | string | number) {
  var parts = path.split(".");

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    if (obj[p] === undefined) {
      if (i === parts.length - 1) {
        obj[p] = value;
      } else {
        obj[p] = {};
      }
    }

    obj = obj[p];
  }

  return obj;
}

/**
 * Validates values by Yup schema
 * @prop {object} values The json object
 * @prop {object} schema The yup schema
 */
function validateSchema<T>(values: object, schema: Schema<any>): T | null {
  const getErrorsFromValidationError = (
    validationError: ValidationError
  ): T | null => {
    let errors = {};
    validationError.inner.forEach((error: ValidationError) => {
      setProperty(errors, error.path, error.message);
    });
    return errors as T;
  };
  try {
    schema.validateSync(values, { abortEarly: false });
    return null;
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

export default validateSchema;
