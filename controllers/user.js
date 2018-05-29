const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
  try {
    const docs = await User.find({}).select("name email _id");
    const response = {
      count: docs.length,
      users: docs.map(doc => {
        return {
          id: doc._id,
          name: doc.name,
          email: doc.email
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
    const doc = await User.findById(userId).select("name email _id");

    if (!doc) {
      res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
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
    const user = new User(req.body);
    user.hash_password = bcrypt.hashSync(req.body.password, 10);

    const newUser = await user.save();

    res.status(201).json({
      message: "Created user sucessfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      }
    });
  } catch (err) {
    err.name === "ValidationError"
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
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      res.status(200).json({
        message: "User deleted"
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedOps = {};

  for (const ops of req.body) {
    updatedOps[ops.propName] = ops.value;
  }

  User.update({ _id: userId }, { $set: updatedOps }, { runValidators: true })
    .then(result => {
      if (result.n === 0)
        res
          .status(404)
          .json({ message: "Not valid entry found for provided ID" });
      else {
        User.findById(userId).then(userUpdated => {
          res.status(200).json({
            message: "User updated",
            user: userUpdated
          });
        });
      }
    })
    .catch(err => {
      err.name === "ValidationError"
        ? res.status(422).json({ error: err })
        : res.status(500).json({ error: err });
    });
};
