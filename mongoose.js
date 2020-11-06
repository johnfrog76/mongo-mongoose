require('dotenv').config()

const mongoose = require('mongoose');
const Product = require('./models/product');
const HttpError = require('./models/http-error');

const url = `mongodb+srv://${process.env.USR}:${process.env.PASS}@cluster0.dnlkt.mongodb.net/${
    process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connection to database!');
}).catch((error) => {
    console.log('Connection failed!');
});

const createProduct = async (req, res, next) => {

    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
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

const getProducts = async (req, res, next) => {
      // exec is find with async and find().cursor returns
    const products = await Product.find().exec();
    res.json(products)
};



exports.createProduct = createProduct;
exports.getProducts = getProducts;