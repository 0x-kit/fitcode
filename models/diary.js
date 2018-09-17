/**
 * Diary Model - Represents a single record of the Diary collection.
 */
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

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
  ],
  recipes: [
    {
      recipe: {
        type: Schema.Types.ObjectId,
        ref: 'recipe',
        required: true,
        _id: false
      },
      serving: {
        type: Number,
        default: 1
      }
    }
  ],
});

/** Methods */
DiarySchema.statics.createDiary = function (index, userId, date = moment()) {
  const LABELS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
  return {
    user: userId,
    date: date,
    part: LABELS[index],
    products: [],
    recipes: []
  };
};

const Diary = mongoose.model('diary', DiarySchema);
module.exports = Diary;


