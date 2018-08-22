/**
 * Goals Schema - It's not a collection
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoalSchema = new Schema({
  currentWeight: [
    {
      date: Date,
      weight: Number
    }
  ],
  goalWeight: Number,
  macros: {
    proteins: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
    calories: { type: Number }
  }
});

module.exports = GoalSchema;
