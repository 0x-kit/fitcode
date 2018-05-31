const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res, next) => {
  try {
    const docs = await User.find({}).select('name email _id hash_password');
    const response = {
      count: docs.length,
      users: docs.map(doc => {
        return {
          id: doc._id,
          name: doc.name,
          email: doc.email,
          password: doc.hash_password
        };
      })
    };
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doc = await User.findById(userId).select('name email _id');

    if (!doc) {
      res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
    } else {
      res.status(200).json({
        user: doc
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let user = new User(req.body);

    // if (user.hash_password)
    //   user.hash_password = bcrypt.hashSync(user.hash_password, 10);

    const newUser = await user.save();

    res.status(201).json({
      message: 'Created user sucessfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.hash_password
      }
    });
  } catch (err) {
    err.name === 'ValidationError'
      ? res.status(422).json({ error: err.message })
      : res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
    } else {
      res.status(200).json({
        message: 'User deleted'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newProps = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
    }

    const userUpdated = await user.update(newProps, { runValidators: true });
    res.status(200).json({ message: 'user updated' });
  } catch (err) {
    err.name === 'ValidationError'
      ? res.status(422).json({ error: err })
      : res.status(500).json({ error: err });
  }
};
