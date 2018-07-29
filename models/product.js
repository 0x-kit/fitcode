/**
 * Product Model - Represents a single record of the product collection.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Product name must be longer than 2 characters.'
    },
    required: [true, 'Product name is required.']
  },
  brand: {
    type: String,
    validate: {
      validator: brand => brand.length > 2,
      message: 'Brand name must be longer than 2 characters.'
    }
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required.']
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs are required.']
  },
  proteins: {
    type: Number,
    required: [true, 'Proteins are required.']
  },
  fats: {
    type: Number,
    required: [true, 'Fats are required.']
  }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
