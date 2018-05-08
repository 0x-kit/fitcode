
const User = require('../models/user')
const _ = require('lodash');

exports.getUsers = (req, res, next) => {
    User.find({})
        .select('name email _id')
        .then(result => {
            const docs = _.mapKeys(result, 'id');

            const response = {
                count: _.size(docs),
                users: docs
            }
            res.status(200).json({ response });
        })
        .catch(err => { res.status(500).json({ error: err }) });
}

exports.readUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .select('name email _id')
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Not valid entry found for provided ID' });
            }
            else {
                const user = { [result.id]: result };

                res.status(200).json({
                    user,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/user`
                    }
                });
            }
        })
        .catch(err => { res.status(500).json({ error: err }) });
}


exports.createUser = (req, res, next) => {
    const userProps = req.body;

    User.create(userProps)
        .then((doc) => {
            res.status(201).json({
                message: 'Created user sucessfully',
                user: {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email
                },
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/user/${doc._id}`
                }
            });
        })
        .catch(err => { (err.name === "ValidationError") ? res.status(422).json({ error: err.message }) : res.status(500).json({ error: err }); });
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedOps = {};

    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }
    //{name: req.body.newName, price: req.body.newPrice}
    //{ n: 0, nModified: 0, ok: 1 } id no existe
    //{ ok: 0, n: 0, nModified: 0 } prop no existe
    //{ n: 1, nModified: 1, ok: 1 } updated
    User.update({ _id: userId }, { $set: updatedOps }, { runValidators: true })
        .then(result => {
            if (result.n === 0)
                res.status(404).json({ message: 'Not valid entry found for provided ID' });
            else {
                User.findById(userId)
                    .then((userUpdated) => {
                        res.status(200).json({
                            message: 'User updated',
                            user: userUpdated,
                            request: {
                                type: 'GET',
                                url: `http://localhost:3000/user`
                            }
                        });
                    })
            }
        })
        .catch(err => { (err.name === "ValidationError") ? res.status(422).json({ error: err }) : res.status(500).json({ error: err }); });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findByIdAndRemove(userId)
        .then((result) => {
            if (!result) {
                res.status(404).json({ message: 'Not valid entry found for provided ID' });
            } else {
                res.status(200).json({
                    message: 'User deleted'
                })
            }
        })
        .catch(err => { res.status(500).json({ error: err }) });
};




