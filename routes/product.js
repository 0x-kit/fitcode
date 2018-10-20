const router = require('express').Router();
const ProductsController = require('../controllers/product');

const authController = require('../controllers/auth2');
const requireAuth = authController.requireAuth;

router
  .get('/search', requireAuth, ProductsController.searchProducts)

  .get('/user/:userId', requireAuth, ProductsController.getUserProducts)

  .get('/', ProductsController.getProducts)

  .get('/:productId', requireAuth, ProductsController.readProduct)

  .post('/', requireAuth, ProductsController.createProduct)

  .put('/:productId', requireAuth, ProductsController.updateProduct)

  .delete('/:productId', requireAuth, ProductsController.deleteProduct);

module.exports = router;
