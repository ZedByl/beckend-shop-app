const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });
const UserController = require('../user/user.controller');

router.get('/:userId', auth, UserController.getUser);
router.patch('/:userId', auth, UserController.editUser);

module.exports = router;