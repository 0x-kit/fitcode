const required = 'This field is required';
const numbers = 'This field can only contain numbers';
const negative = 'This field cant contain negative values';
const length = l => `This field must be at least ${l} characters length`;
const invalidEmail = 'Invalid email adress';

export function validateNumbers(values) {
  const errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!value) {
      errors[key] = required;
    } else if (isNaN(value)) {
      errors[key] = numbers;
    } else if (value < 0) {
      errors[key] = negative;
    }
  });

  return errors;
}

export function validateText(values, minLength = 2) {
  const errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!value) {
      errors[key] = required;
    } else if (value.length < minLength) {
      errors[key] = length(minLength);
    }
  });

  return errors;
}

export function validateEmail(name, value) {
  const errors = {};

  if (!value) {
    errors[name] = required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errors[name] = invalidEmail;
  }

  return errors;
}
