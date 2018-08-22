const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const docs = await User.find({}).select('name email _id hash_password goals');

    res.status(200).json({ docs });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('name email _id');

    if (!user) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({
        user: user
      });
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
      message: 'Created user sucessfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        hash_password: newUser.password
      }
    });
  } catch (err) {
    err.name === 'ValidationError'
      ? res.status(422).json({ error: err.message })
      : res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({
        message: 'User deleted'
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
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'User updated!', user: userUpdated });
    }
  } catch (err) {
    err.name === 'ValidationError' ? res.status(422).json({ error: err }) : res.status(500).json({ error: err });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goals = await User.findById(userId).select('goals');
    if (!goals) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
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

exports.setMacros = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newGoals = req.body;

    const goals = await User.findByIdAndUpdate(
      userId,
      { $set: { 'goals.macros': newGoals } },
      {
        new: true,
        runValidators: true
      }
    ).select('goals.macros');

    if (!goals) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(goals.goals.macros);
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
      { $push: { 'goals.currentWeight': currentWeight } },
      {
        new: true,
        runValidators: true
      }
    ).select('goals.currentWeight');

    if (!goals) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(goals.goals);
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
      { $set: { 'goals.goalWeight': weight.goalWeight } },
      {
        new: true,
        runValidators: true
      }
    ).select('goals.goalWeight');

    if (!goals) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(goals.goals.goalWeight);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// exports.getCurrentWeight = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const goals = await User.findById(userId);

//     if (!goals) {
//       return res.status(404).json({ message: 'Not valid entry found for provided ID' });
//     } else {
//       return res.status(200).json(goals.goals.currentWeight);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err });
//   }
// };
