/**
 * Nutritional Info Model - Represents a single record of the nutritional_info collection.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NutritionalInfoSchema = new Schema({
    carb: { type: Number, required: [true, 'Carbohydrates is required.'] },
    fat: { type: Number, required: [true, 'Fats are required.'] },
    protein: { type: Number, required: [true, 'Proteins are required.'] },
    calories: { type: Number }
});

const NutritionalInfo = mongoose.model('nutritional_info', NutritionalInfoSchema);
module.exports = NutritionalInfo;



// calories = (carbs * 4) + (fats * 9) + (proteins * 4);
