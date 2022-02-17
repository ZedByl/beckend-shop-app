const CategoryService = require('./category.service');

class CategoryController {

    async getCategories(req, res) {
        const data = await CategoryService.getCategories();
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async getCategoriesWhitProducts(req, res) {
        const data = await CategoryService.getCategoriesWithProducts();
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async getCategory(req, res) {
        const { id } = req.params;
        const data = await CategoryService.getCategory(id);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async addCategory(req, res) {
        const data = await CategoryService.addCategory(req.body);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }
}

module.exports = new CategoryController();