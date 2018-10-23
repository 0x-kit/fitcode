const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).select('_id name brand user');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).select('_id name brand calories carbs proteins fats user');

    if (!product) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json({ message: 'Product successfully created.', product: newProduct });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    let newProps = req.body;

    const productUpdated = await Product.findByIdAndUpdate(productId, newProps, {
      new: true,
      runValidators: true
    });

    if (!productUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Product successfully updated.', product: productUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const newProps = { user: null };

    const productDeleted = await Product.findByIdAndUpdate(productId, newProps, {
      new: true,
      runValidators: true
    });

    if (!productDeleted) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Product successfully deleted.', product: productDeleted });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const term = new RegExp(req.query.like, 'i');

    const products = await Product.find()
      .or([{ name: term }, { brand: term }])
      .select('_id name brand calories carbs proteins fats');

    const message = products.length === 0 ? 'No products found.' : `${products.length} products found.`;

    return res.status(200).json({ message, products });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const products = await Product.find({ user: userId }).select('_id name brand calories carbs proteins fats user');

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
