const router = require('express').Router();
const ProductsController = require('../controllers/product');

router
  .get('/search', ProductsController.searchProducts)

  .get('/user/:userId', ProductsController.getUserProducts)

  .get('/', ProductsController.getProducts)

  .get('/:productId', ProductsController.readProduct)

  .post('/', ProductsController.createProduct)

  .put('/:productId', ProductsController.updateProduct)

  .delete('/:productId', ProductsController.deleteProduct);

module.exports = router;
