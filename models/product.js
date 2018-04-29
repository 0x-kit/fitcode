/**
 * Product Model - Represents a single record of the product collection.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    brand: {
        type: String,
        validate: {
            validator: (brand) => brand.length > 2,
            message: 'Brand must be longer than 2 characters.'
        },
    },
    nutritional_info: {
        type: Schema.Types.ObjectId,
        ref: 'nutritional_info',
        required: true
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;