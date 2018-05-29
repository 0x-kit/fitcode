const UsersController = require("../controllers/user");
const router = require("express").Router();

router
  .get("/", UsersController.getUsers)
  .get("/:userId", UsersController.readUser)
  .post("/", UsersController.createUser)
  .patch("/:userId", UsersController.updateUser)
  .delete("/:userId", UsersController.deleteUser);

module.exports = router;
