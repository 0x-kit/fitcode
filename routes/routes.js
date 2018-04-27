const UsersController = require('../controllers/user');

module.exports = (app) => {
    app.get('/api', UsersController.greeting);
}