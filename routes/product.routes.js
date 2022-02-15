const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router({mergeParams: true});
const ProductController = require('../product/product.controller')

router.post('/', auth, ProductController.addProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.patch('/:id', auth, ProductController.editProduct);
router.delete('/:id', auth, ProductController.deleteProduct);


module.exports = router;