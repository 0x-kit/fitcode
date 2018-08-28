const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required.']
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required.']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  }
});

const Exercise = mongoose.model('exercise', ExerciseSchema);
module.exports = Exercise;
