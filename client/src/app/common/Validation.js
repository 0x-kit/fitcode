
export function validateNumbers(values) {
    const errors = {};
    const required = 'Required field';
    const numbers = 'This field can only contain numbers';
    const negative = 'This field cant contain negative values';

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
};