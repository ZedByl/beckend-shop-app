const CategoryModel = require('./category.model');
const ApiError = require('../utils/error');

class CategoryService {

    async addCategory(dto) {
        try {
            const category = await CategoryModel.create(dto);
            return category;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async getCategories() {
        try {
            const categories = await CategoryModel.find();
            return categories;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async getCategory(id) {
        try {
            const category = await CategoryModel.findOne(id);
            return category;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }
}

module.exports = new CategoryService();