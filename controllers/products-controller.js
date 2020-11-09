require('dotenv').config()

const mongoose = require('mongoose');
const Product = require('../models/product');
const HttpError = require('../models/http-error');

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        onsale: req.body.onsale
    });

    let result;
    try {
        result = await createdProduct.save();
    } catch (err) {
        const error = new HttpError (
            'failed to create new product',
            500
        );
        return next(error);
    }
    res.json(result);
};

const deleteProduct = async (req, res, next) => {
    const productId = req.params.pid;

    let product;
    try {
      product = await Product.findByIdAndRemove(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete product.',
        500
      );
      return next(error);
    }

    res.status(200).json({ message: 'Deleted product.' });
  };

const viewProduct = async (req, res, next) => {
    const productId = req.params.pid;

    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a product.',
        500
      );
      return next(error);
    }

    if (!product) {
      const error = new HttpError(
        'Could not find product for the provided id.',
        404
      );
      return next(error);
    }
  
    res.json({ product: product.toObject({ getters: true }) });
  };

const getProducts = async (req, res, next) => {
      // exec is find with async and find().cursor returns
    let products;

    try {
      products = await Product.find({}, 'name').exec();
    } catch (err) {
      const error = new HttpError (
        'Could not find products',
        500
      );
      return next(error);
    }

    res.json(products)
};

const updateProduct = async (req, res, next) => {
    const { onsale, price } = req.body;
    const productId = req.params.pid;

    let product;
    try {
      product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update product.',
        500
      );
      return next(error);
    }

    product.onsale = onsale;
    product.price = price;

    try {
      await product.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update product.',
        500
      );
      return next(error);
    }

    res.status(200).json({ product: product.toObject({ getters: true }) });
  };

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.viewProduct = viewProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;