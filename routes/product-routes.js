const express = require('express');

const productsController = require('../controllers/products-controller');

const router = express.Router();

router.get('/', productsController.getProducts);

router.post('/', productsController.createProduct);

router.get('/:pid', productsController.viewProduct);

router.delete('/:pid', productsController.deleteProduct);

router.patch('/:pid', productsController.updateProduct);

module.exports = router;
