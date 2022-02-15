const express = require('express');
const router = express.Router({mergeParams: true});
const CategoryController = require('../category/category.controller')

router.post('/', CategoryController.addCategory)
router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategory)

module.exports = router