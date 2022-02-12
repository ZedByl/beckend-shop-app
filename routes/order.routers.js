const express = require('express');
const Order = require('../models/Order');
const router = express.Router({mergeParams: true});

router.post('/', async (req, res) => {
        try {
            const userId = req.user?._id
            const newOrder = await Order.create({
                ...req.body,
                userId
            });
            res.status(201).send(newOrder);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    });

module.exports = router