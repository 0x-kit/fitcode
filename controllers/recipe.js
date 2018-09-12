const Recipe = require("../models/recipe");
const _ = require("lodash");
const mongoose = require("mongoose");

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
    const recipeDeleted = await Recipe.findByIdAndRemove(recipeId);

    if (!recipeDeleted) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        message: "Recipe successfully deleted.",
        recipe: recipeDeleted
      });
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

exports.addProduct = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const newProduct = req.body;

    const recipeProducts = await Recipe.findById(recipeId)
      .select("-_id products.product")
      .populate("product._id");

    const productId = mongoose.Types.ObjectId(newProduct.product);
    const productsArr = recipeProducts.products;
    const alreadyExists = _.find(productsArr, { product: productId });

    if (!_.isUndefined(alreadyExists)) {
      return res
        .status(200)
        .json({ message: "Product is already added. Just edit grams." });
    }

    const recipeUpdated = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $push: { products: newProduct }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (!recipeUpdated) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({ message: "Product successfully added." });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const productId = req.params.productId;

    const recipeUpdated = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $pull: { products: { product: productId } }
      },
      {
        runValidators: true,
        upsert: true,
        new: true
      }
    )
      .select(" products _id user name")
      .populate({ path: "user", select: "name" })
      .populate({ path: "products.product" });

    if (!recipeUpdated) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        message: "Product successfully deleted.",
        recipe: recipeUpdated
      });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const productUpdated = req.body;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    }

    const query = await Recipe.update(
      {
        _id: recipeId,
        "products.product": productUpdated.product
      },
      {
        $set: { "products.$.grams": productUpdated.grams }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (query.n === 1) {
      const recipeUpdated = await Recipe.findById(recipeId)
        .select(" products _id user name")
        .populate({ path: "user", select: "name" })
        .populate({ path: "products.product" });

      return res.status(200).json({
        message: "Product successfully updated.",
        recipe: recipeUpdated
      });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};
