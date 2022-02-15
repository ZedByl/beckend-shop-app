const express = require('express');
const { check } = require('express-validator');
const router = express.Router({ mergeParams: true });
const AuthorizationController = require('../authorization/authorization.controller');
const auth = require('../middleware/auth.middleware');

router.post('/signUp', [
    check('name', 'Минимальная длина имени 1 символ').isLength({ min: 1 }),
    check('email', 'Некорректный email').isEmail(),
    check('phone', 'Минимальная длина номер 11 символв').isLength({ min: 11 }),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    AuthorizationController.signUp
]);

router.post('/signInWithPassword', [
    check('email', 'Email некорректный').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
    AuthorizationController.signIn
]);

router.post('/token', AuthorizationController.refreshTokens);

router.patch('/resetPassword/:userId', auth, AuthorizationController.resetPassword);

module.exports = router;