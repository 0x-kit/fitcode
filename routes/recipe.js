const router = require("express").Router();
const RecipeController = require("../controllers/recipe");

router

  .get("/", RecipeController.getRecipes)

  .get("/:recipeId", RecipeController.readRecipe)

  .post("/", RecipeController.createRecipe)

  .put("/:recipeId", RecipeController.updateRecipe)

  .delete("/:recipeId", RecipeController.deleteRecipe);

module.exports = router;
