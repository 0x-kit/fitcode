const moment = require('moment');
const Diary = require('../models/diary');
const User = require('../models/user');
const _ = require('lodash');
const mongoose = require('mongoose');

exports.readDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await Diary.findById(diaryId).select('user products recipes');

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(diary);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getDiaries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const reqDate = req.query.date;

    const startDate = moment(reqDate)
      .startOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    const endDate = moment(reqDate)
      .endOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    if (!user) return res.status(404).json({ message: 'Not valid entries found for provided ID' });

    const docs = await Diary.find({ user: userId, date: { $gte: startDate, $lte: endDate } })
      .select(' products recipes user date part')
      .populate({ path: 'products.product' })
      .populate({
        path: 'recipes.recipe',
        populate: {
          path: 'products.product'
        }
      });

    if (docs.length !== 0) return res.status(200).json(docs);

    const diaries = _.times(5, index => Diary.createDiary(index, userId, startDate));
    await Diary.insertMany(diaries);

    const newDocs = await Diary.find({ user: userId, date: { $gte: startDate, $lte: endDate } })
      .select(' products recipes user date part')
      .populate({ path: 'products.product' })
      .populate({
        path: 'recipes.recipe',
        populate: {
          path: 'products.product'
        }
      });

    if (newDocs.length !== 0) return res.status(200).json(newDocs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const newProduct = req.body;

    const diaryProducts = await Diary.findById(diaryId)
      .select('-_id products.product')
      .populate('product._id');

    const productId = mongoose.Types.ObjectId(newProduct.product);
    const productsArr = diaryProducts.products;
    const alreadyExists = _.find(productsArr, { product: productId });

    if (!_.isUndefined(alreadyExists)) {
      return res.status(200).json({ message: 'Product is already added. Just edit grams.' });
    }

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $push: { products: newProduct }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Product successfully added.' });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const productId = req.params.productId;

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $pull: { products: { product: productId } }
      },
      {
        runValidators: true,
        upsert: true,
        new: true
      }
    )
      .select(' products recipes _id user date name part')
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'products.product' })
      .populate({
        path: 'recipes.recipe',
        populate: {
          path: 'products.product'
        }
      });

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Product successfully deleted.', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const productUpdated = req.body;

    const diary = await Diary.findById(diaryId);

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    }

    const query = await Diary.update(
      {
        _id: diaryId,
        'products.product': productUpdated.product
      },
      {
        $set: { 'products.$.grams': productUpdated.grams }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (query.n === 1) {
      const diaryUpdated = await Diary.findById(diaryId)
        .select(' products recipes _id user date name part')
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'products.product' })
        .populate({
          path: 'recipes.recipe',
          populate: {
            path: 'products.product'
          }
        });

      return res.status(200).json({ message: 'Product successfully updated.', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const newRecipe = req.body;

    const diaryRecipes = await Diary.findById(diaryId)
      .select('-_id recipes.recipe')
      .populate('recipe._id');

    const recipeId = mongoose.Types.ObjectId(newRecipe.recipe);
    const recipeArr = diaryRecipes.recipes;
    const alreadyExists = _.find(recipeArr, { recipe: recipeId });

    if (!_.isUndefined(alreadyExists)) {
      return res.status(200).json({ message: 'Recipe is already added. Just edit qty.' });
    }

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $push: { recipes: newRecipe }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Recipe successfully added.', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    console.log('error fatal');
    res.status(422).json({ error: err });
  }
};

exports.editRecipe = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const recipeUpdated = req.body;

    const diary = await Diary.findById(diaryId);

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    }

    const query = await Diary.update(
      {
        _id: diaryId,
        'recipes.recipe': recipeUpdated.recipe
      },
      {
        $set: { 'recipes.$.serving': recipeUpdated.serving }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (query.n === 1) {
      const diaryUpdated = await Diary.findById(diaryId)
        .select(' products recipes _id user date name part')
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'products.product' })
        .populate({
          path: 'recipes.recipe',
          populate: {
            path: 'products.product'
          }
        });

      return res.status(200).json({ message: 'Recipe successfully updated.', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const recipeId = req.params.recipeId;

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $pull: { recipes: { recipe: recipeId } }
      },
      {
        runValidators: true,
        upsert: true,
        new: true
      }
    )
      .select(' products recipes _id user date name part')
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'products.product' })
      .populate({
        path: 'recipes.recipe',
        populate: {
          path: 'products.product'
        }
      });

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Recipe successfully deleted.', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};
