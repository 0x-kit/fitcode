User = require('../../models/user');

function mail() {
    return Math.random().toString(36).substring(7) + '@test.com';
}

module.exports = {
    /**
     * required
     */
    emptyUserName() { return new User({ email: 'test@test.com', password: 'password' }) },
    emptyUserPassword() { return new User({ name: 'tester', email: 'test@test.com', }) },
    emptyUserEmail() { return new User({ name: 'tester', password: 'password' }) },
    /**
     * validate
     */
    invalidUserId() { return new User({ _id: '5ae5a212700aa219f82e54e1', name: 'tt', email: 'testtest.com', password: 'pass' }) },
    invalidUserName() { return new User({ name: 'tt', email: 'test@test.com', password: 'password' }) },
    invalidUserPassword() { return new User({ name: 'tt', email: 'test@test.com', password: 'pass' }) },
    invalidUserEmail() { return new User({ name: 'tt', email: 'testtest.com', password: 'pass' }) },
    existentUser() { return new User({ name: 'user', email: mail() + '@test.com', password: 'password' }) },
    nonExistentUser() { return new User({ _id: '5ae328a947c1c91862ad1c90', name: 'userx', email: mail(), password: 'password' }) },
    updatedUserProps() { return ([{ "propName": "name", "value": "userupdated" }]) },
    updatedInvalidUserName() { return ([{ "propName": "name", "value": "tt" }]) },
    updatedInvalidUserPassword() { return ([{ "propName": "password", "value": "pass" }]) },
    updatedInvalidUserEmail() { return ([{ "propName": "email", "value": "testtest.com" }]) },
}