const Product = require('./models/product');
Product.seed(3, true, (error, message) => {
  if (error) {
  } else {

    console.log('Seed successfulX');
  }
});
