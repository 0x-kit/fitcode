
const required = 'This field is required';
const numbers = 'This field can only contain numbers';
const negative = 'This field cant contain negative values';
const lenght = 'This field must be at least 2 characters length';

export function validateNumbers(name, value) {
    if (value) {
        const errors = {};
        if (!value) {
            errors[name] = required;
        } else if (isNaN(value)) {
            errors[name] = numbers;
        } else if (value < 0) {
            errors[name] = negative;
        }
        return errors;
    }
};

export function validateText(name, value) {
    if (value) {
        const errors = {};
        if (!value) {
            errors[name] = required;
        } else if (value < 2) {
            errors[name] = lenght;
        }
        return errors;
    }
};





// Object.entries(values).forEach(([key, value]) => {
//     if (!value) {
//         errors[key] = required;
//     } else if (value < 2) {
//         errors[key] = lenght;
//     }

// });