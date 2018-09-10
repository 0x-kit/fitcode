const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
        _id: false
      },
      grams: {
        type: Number,
        required: [true, "Grams are required."]
      }
    }
  ]
});

const Recipe = mongoose.model("recipe", RecipeSchema);
module.exports = Recipe;
