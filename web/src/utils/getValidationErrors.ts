import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValitationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
