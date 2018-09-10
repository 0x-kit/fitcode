const Recipe = require("../models/recipe");

exports.getRecipes = async (req, res) => {
  try {
    const docs = await Recipe.find({})
      .select("_id user name products")
      .populate("products.product");
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId)
      .select("_id user name products")
      .populate("products.product");

    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json(recipe);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);

    await newRecipe.save();

    res.status(201).json({
      message: "Recipe successfully created.",
      recipe: newRecipe
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findByIdAndRemove(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res
        .status(200)
        .json({ message: "Recipe successfully deleted.", recipe });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const newProps = req.body;

    const recipeUpdated = await Recipe.findByIdAndUpdate(recipeId, newProps, {
      new: true,
      runValidators: true
    })
      .select("_id user name products")
      .populate("products.product");

    if (!recipeUpdated) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        message: "Recipe successfully updated.",
        recipe: recipeUpdated
      });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};
