const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const docs = await Product.find({}).select(
      "_id name brand calories carbs proteins fats"
    );
    const response = {
      count: docs.length,
      Products: docs.map(doc => {
        return {
          id: doc._id,
          name: doc.name,
          brand: doc.brand,
          calories: doc.calories,
          carbs: doc.carbs,
          proteins: doc.proteins,
          fats: doc.fats
        };
      })
    };
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).select(
      "_id name brand calories carbs proteins fats"
    );

    if (!product) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        product: product
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json({
      message: "Created product sucessfully",
      product: {
        id: newProduct._id,
        name: newProduct.name,
        brand: newProduct.brand,
        calories: newProduct.calories,
        carbs: newProduct.carbs,
        proteins: newProduct.proteins,
        fats: newProduct.fats
      }
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res.status(200).json({
        message: "Product deleted"
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let productId = req.params.productId;
    let newProps = req.body;

    const productUpdated = await Product.findByIdAndUpdate(
      productId,
      newProps,
      {
        new: true,
        runValidators: true
      }
    );

    if (!productUpdated) {
      return res
        .status(404)
        .json({ message: "Not valid entry found for provided ID" });
    } else {
      return res
        .status(200)
        .json({ message: "Product updated!", product: productUpdated });
    }
  } catch (err) {
    res.status(422).json({ error: err });
  }
};
