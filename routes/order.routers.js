const express = require('express');
const router = express.Router({mergeParams: true});
const OrderController = require('../order/order.controller')

router.post('/', OrderController.createOrder);
router.post('/all', OrderController.getOrders);
router.get('/orderId', OrderController.getOrder);

module.exports = router