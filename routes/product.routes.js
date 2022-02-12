const express = require('express');
const auth = require('../middleware/auth.middleware');
const Product = require('../models/Product');
const router = express.Router({mergeParams: true});

// /api/product
router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await Product.find();
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newProduct = await Product.create({...req.body, count: 1});
            res.status(201).send(newProduct);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    });

router.patch('/:productId', auth, async (req, res) => {
    try {
        const {productId} = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.send(updatedProduct);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

router.delete('/:productId', auth, async (req, res) => {
    try {
        const {productId} = req.params;
        const removedProduct = await Product.findById(productId);

        await removedProduct.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;