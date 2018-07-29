/**
 * Diary Model - Represents a single record of the Diary collection.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: { type: Date, default: Date.now },
  part: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'],
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        _id: false
      },
      grams: {
        type: Number,
        required: [true, 'Grams are required.']
      }
    }
  ]
});

const Diary = mongoose.model('diary', DiarySchema);
module.exports = Diary;
