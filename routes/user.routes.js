const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');
const router = express.Router({mergeParams: true});

router.patch('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
            res.send(updatedUser);
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

router.patch('/resetPassword/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params;

        if (userId === req.user._id) {
            const user = await User.findById(userId);
            const isPasswordEqual = await bcrypt.compare(req.body.oldPassword, user.password);

            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                });
            }

            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 12);
            const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedNewPassword}, {new: true});

            const tokens = tokenService.generate({_id: updatedUser._id});
            await tokenService.save(updatedUser._id, tokens.refreshToken);

            res.send({user: updatedUser, tokens: {...tokens, userId: updatedUser._id}});
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

router.get('/:userId', auth, async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id);
        res.send(user);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;