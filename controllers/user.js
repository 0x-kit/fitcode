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
    let user = new User(req.body);

    if (user.hash_password)
      user.hash_password = bcrypt.hashSync(user.hash_password, 10);

    const newUser = await user.save();

    res.status(201).json({
      message: "Created user sucessfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.hash_password
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

// exports.updateUser = (req, res, next) => {
//   const userId = req.params.userId;
//   const updatedOps = {};

//   for (const ops of req.body) {
//     updatedOps[ops.propName] = ops.value;
//   }
//   // res.status(404).json({ message: "Not valid entry found for provided ID" });

//   User.update({ _id: userId }, { $set: updatedOps }, { runValidators: true })
//     .then(result => {
//       User.findById(userId).then(userUpdated => {
//         res.status(200).json({
//           message: "User updated",
//           user: userUpdated
//         });
//       });
//     })
//     .catch(err => {
//       err.name === "ValidationError"
//         ? res.status(422).json({ error: err })
//         : res.status(500).json({ error: err });
//     });
// };

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  // res.status(404).json({ message: "Not valid entry found for provided ID" });

  try {
    const user = await User.findById(userId);
    if (!user)
      res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });

    for (let p in req.body) {
      user[p] = req.body[p];
    }

    await user.save();
    res.status(200).json({ message: "user updated" });
  } catch (err) {
    console.log(err);
    err.name === "ValidationError"
      ? res.status(422).json({ error: err })
      : res.status(500).json({ error: err });
  }
};
