const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/product', require('./product.routes'));
router.use('/order', require('./order.routers'));

module.exports = router;