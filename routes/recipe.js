const router = require("express").Router();
const RecipeController = require("../controllers/recipe");

const authController = require("../controllers/auth2");
const requireAuth = authController.requireAuth;

router

  .get("/", RecipeController.getRecipes)

  .get("/:recipeId", RecipeController.readRecipe)

  .post("/", RecipeController.createRecipe)

  .put("/:recipeId", RecipeController.updateRecipe)

  .delete("/:recipeId", RecipeController.deleteRecipe)

  /***** BASIC CRUD */

  // .get("/user/:userId", RecipeController.getUserRecipes)

  .post("/:recipeId/product", requireAuth, RecipeController.addProduct)
  
  .put("/:recipeId/product", requireAuth, RecipeController.editProduct)

  .delete("/:recipeId/product/:productId", RecipeController.deleteProduct);

module.exports = router;
