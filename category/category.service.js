const CategoryModel = require('./category.model');
const ProductModal = require('../product/product.model');

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
            };
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
            };
        }
    }

    async getCategoriesWithProducts() {
        try {
            const categories = await CategoryModel.find();
            const categoriesWithProducts = [];

            for (const category of categories) {
                const products = await ProductModal.find({ type: category._id });
                categoriesWithProducts.push({
                    title: category.title,
                    categoryId: category._id,
                    products: products
                });
            }

            return categoriesWithProducts;

        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            };
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
            };
        }
    }
}

module.exports = new CategoryService();