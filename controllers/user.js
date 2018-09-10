const mongoose = require("mongoose");
const moment = require("moment");

const User = require("../models/user");
const Exercise = require("../models/exercise");
const Diary = require("../models/diary");
const Product = require("../models/product");
const Recipe = require("../models/recipe");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "name email _id hash_password goals"
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("name email _id");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).json({
      message: "User sucessfully created.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        hash_password: newUser.password
      }
    });
  } catch (err) {
    err.name === "ValidationError"
      ? res.status(422).json({ error: err.message })
      : res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        message: "User sucessfully deleted.",
        user
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    let newProps = req.body;

    const userUpdated = await User.findByIdAndUpdate(userId, newProps, {
      new: true,
      runValidators: true
    });

    if (!userUpdated) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res
        .status(200)
        .json({ message: "User sucessfully updated.", user: userUpdated });
    }
  } catch (err) {
    err.name === "ValidationError"
      ? res.status(422).json({ error: err })
      : res.status(500).json({ error: err });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goals = await User.findById(userId).select("goals");
    if (!goals) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        macros: goals.goals.macros,
        goalWeight: goals.goals.goalWeight,
        currentWeight: goals.goals.currentWeight
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getExercises = async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = moment()
      .startOf("day")
      .format("YYYY-MM-DD");

    const docs = await Exercise.find({ user: userId, date: date }).select(
      "_id date user calories name"
    );

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.setMacros = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newGoals = req.body;

    const goals = await User.findByIdAndUpdate(
      userId,
      { $set: { "goals.macros": newGoals } },
      {
        new: true,
        runValidators: true
      }
    ).select("goals.macros");

    if (!goals) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res
        .status(200)
        .json({
          message: "Macros sucessfully updated.",
          macros: goals.goals.macros
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.setCurrentWeight = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentWeight = req.body;

    const goals = await User.findByIdAndUpdate(
      userId,
      { $push: { "goals.currentWeight": currentWeight } },
      {
        new: true,
        runValidators: true
      }
    ).select("goals.currentWeight");

    if (!goals) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      const currentWeight = goals.goals;
      return res
        .status(200)
        .json({ message: "Current Weight sucessfully added.", currentWeight });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.setGoalWeight = async (req, res) => {
  try {
    const userId = req.params.userId;
    const weight = req.body;

    const goals = await User.findByIdAndUpdate(
      userId,
      { $set: { "goals.goalWeight": weight.weight } },
      {
        new: true,
        runValidators: true
      }
    ).select("goals.goalWeight");

    if (!goals) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res
        .status(200)
        .json({
          message: "Goal Weight sucessfully updated.",
          goalWeight: goals.goals
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getRecentProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const part = req.query.part;
    const user = await User.findById(userId);

    let productsArr = [];

    if (!user)
      return res
        .status(404)
        .json({ message: "Not valid entries found for provided ID" });

    const diaries = await Diary.find({
      user: userId,
      products: { $exists: true, $not: { $size: 0 } }
    })
      .and({ part: part })
      .select("-_id products.product")
      .populate("product._id");

    diaries.map(({ products }) =>
      products.map(({ product }) =>
        productsArr.push(mongoose.Types.ObjectId(product))
      )
    );

    const products = await Product.find({ _id: { $in: productsArr } });

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const userId = req.params.userId;

    const docs = await Recipe.find({ user: userId }).select("_id user name products")
      .populate("products.product");

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
