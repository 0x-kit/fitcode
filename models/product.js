/**
 * Product Model - Represents a single record of the product collection.
 */

const mongoose = require('mongoose');
const fakegoose = require('fakegoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Product name must be longer than 2 characters.'
    },
    required: [true, 'Product name is required.'],
    fake: 'commerce.productName'
  },
  brand: {
    type: String,
    validate: {
      validator: brand => brand.length > 2,
      message: 'Brand name must be longer than 2 characters.'
    },
    fake: 'commerce.productAdjetive'
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required.'],
    fake: 'random.number'
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs are required.'],
    fake: 'random.number'
  },
  proteins: {
    type: Number,
    required: [true, 'Proteins are required.'],
    fake: 'random.number'
  },
  fats: {
    type: Number,
    required: [true, 'Fats are required.'],
    fake: 'random.number'
  }
});

ProductSchema.plugin(fakegoose);
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
