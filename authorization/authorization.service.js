const UserService = require('../user/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('./token.model');
const User = require('../user/user.model');

class AuthorizationService {

    async signIn(dto) {
        try {
            const { email, password } = dto;

            const foundUser = await UserService.findUserByProperty({ email });

            if (!foundUser) {
                return {
                    message: 'Пользователь с таким email не существует',
                    error: true,
                    status: 400
                }
            }

            const isPasswordEqual = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordEqual) {
                return {
                    message: 'Неверный пароль',
                    error: true,
                    status: 400
                }
            }

            const tokens = this.generateToken({ _id: foundUser._id });
            await this.saveToken(foundUser._id, tokens.refreshToken);

            return { ...tokens, userId: foundUser._id };
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async signUp(dto) {
        try {
            const { email, phone, password } = dto;

            const checkPhone = await UserService.findUserByProperty({ phone });

            if (checkPhone) {
                return {
                    message: 'Пользователь с таким телефоном уже существует',
                    error: true,
                    status: 400
                }
            }

            const checkEmail = await UserService.findUserByProperty({ email });

            if (checkEmail) {
                return {
                    message: 'Пользователь с таким email уже существует',
                    error: true,
                    status: 400
                }
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await UserService.createUser({
                ...dto,
                role: 'user',
                password: hashedPassword
            });

            const tokens = this.generateToken({ _id: user._id });
            await this.saveToken(user._id, tokens.refreshToken);

            return { ...tokens, userId: user._id };
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async refreshTokens(dto) {
        try {
            const { refresh_token: refreshToken } = dto;
            const data = this.validateRefresh(refreshToken);
            const dbToken = await this.findToken(refreshToken);

            if (this.isTokenInvalid(data, dbToken)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const tokens = this.generateToken({
                _id: data._id
            });
            await this.saveToken(data._id, tokens.refreshToken);
            return { ...tokens, userId: data._id };
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    isTokenInvalid(data, dbToken) {
        return !data || !dbToken || data._id !== dbToken?.user?.toString();
    }

    generateToken(payload) {
        const accessToken = jwt.sign(payload, config.get('accessSecret'), {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload, config.get('refreshSecret'));
        return { accessToken, refreshToken, expiresIn: 3600 };
    }

    async saveToken(user, refreshToken) {
        const data = await Token.findOne({ user });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }

        const token = await Token.create({ user, refreshToken });
        return token;
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get('refreshSecret'));
        } catch (e) {
            return null;
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get('accessSecret'));
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    }

    async resetPassword(userId, dto) {
        try {
            if (userId) {
                const user = await User.findById(userId);
                const isPasswordEqual = await bcrypt.compare(dto.oldPassword, user.password);

                if (!isPasswordEqual) {
                    return {
                        message: 'Неверный пароль',
                        error: true,
                        status: 400
                    }
                }

                const hashedNewPassword = await bcrypt.hash(dto.newPassword, 12);
                const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedNewPassword }, { new: true });

                const tokens = this.generateToken({ _id: updatedUser._id });
                await this.saveToken(updatedUser._id, tokens.refreshToken);

                return { user: updatedUser, tokens: { ...tokens, userId: updatedUser._id } };
            } else {
                return {
                    message: 'Не авторизован',
                    error: true,
                    status: 400
                };
            }
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }
}

module.exports = new AuthorizationService();