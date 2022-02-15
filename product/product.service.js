const Product = require('./product.model');

class ProductService {
    async getProducts() {
        try {
            const list = await Product.find();
            return list;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async getProduct(id) {
        try {
            const product = await Product.findOne(id);
            return product;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async addProduct(dto) {
        try {
            const product = await Product.create(dto);
            return product;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async editProduct(id, dto) {
        try {
            const product = await Product.findByIdAndUpdate(id, dto, { new: true });
            return product;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async deleteProduct(id) {
        try {
            const removedProduct = await Product.findById(id);

            await removedProduct.remove();
            return {
                message: 'Продукт успешно удалён'
            };
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }
}

module.exports = new ProductService();