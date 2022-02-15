const ProductService = require('./product.service');

class ProductController {

    async getProducts(req, res) {
        const data = await ProductService.getProducts();
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async getProduct(req, res) {
        const { id } = req.params;
        const data = await ProductService.getProduct(id);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async addProduct(req, res) {
        const data = await ProductService.addProduct(req.body);
        const status = data.status ? data.status : 201
        res.status(status).json(data);
    }

    async editProduct(req, res) {
        const {id} = req.params;
        const data = await ProductService.editProduct(id, req.body);
        const status = data.status ? data.status : 201
        res.status(status).json(data);
    }

    async deleteProduct(req, res) {
        const { id } = req.params;

        const data = await ProductService.deleteProduct(id);
        const status = data.status ? data.status : 201
        res.status(status).json(data)
    }
}

module.exports = new ProductController();