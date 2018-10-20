const router = require('express').Router();
const RecipeController = require('../controllers/recipe');

const authController = require('../controllers/auth2');
const requireAuth = authController.requireAuth;

router

  .get('/', RecipeController.getRecipes)

  .get('/:recipeId', RecipeController.readRecipe)

  .post('/', requireAuth, RecipeController.createRecipe)

  .put('/:recipeId', requireAuth, RecipeController.updateRecipe)

  .delete('/:recipeId', requireAuth, RecipeController.deleteRecipe)

  .post('/:recipeId/product', requireAuth, RecipeController.addProduct)

  .put('/:recipeId/product', requireAuth, RecipeController.editProduct)

  .delete('/:recipeId/product/:productId', requireAuth, RecipeController.deleteProduct);

module.exports = router;
