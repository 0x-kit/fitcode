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
  ]
});

/** Methods */
DiarySchema.statics.createDiary = function(index, userId, date = moment()) {
  const LABELS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
  return {
    user: userId,
    date: date,
    part: LABELS[index],
    products: []
  };
};

// DiarySchema.statics.findDiaries = async function(userId, startDate, endDate) {
//   const docs = await Diary.find({ user: userId, date: { $gte: startDate, $lte: endDate } })
//     .select(' products user date part')
//     .populate('products.product');
//     console.log(docs);
//   return docs;

// };

const Diary = mongoose.model('diary', DiarySchema);
module.exports = Diary;
