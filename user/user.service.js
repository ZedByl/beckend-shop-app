const UserModel = require('./user.model')

class UserService {
    async createUser(dto) {
        try {
            const user = await UserModel.create(dto);
            return user;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async findUserByProperty(property) {
        try {
            const result = await UserModel.findOne(property);
            return result
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async findUserById(id) {
        try {
            const result = await UserModel.findById(id);
            return result
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async editUser(id, dto) {
        try {
            if (id) {
                const user = await UserModel.findByIdAndUpdate(id, dto, {new: true})
                return user
            } else {
                return {
                    message: 'Не авторизован',
                    error: true,
                    status: 400
                }
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

module.exports = new UserService()