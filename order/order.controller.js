const OrderService = require('./order.service');

class OrderController {
    async createOrder(req, res) {
        const data = await OrderService.createOrder(req.body);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    };

    async getOrders(req, res) {
        const data = await OrderService.findOrdersById(req.body);
        const status = data.status ? data.status : 200;
        res.status(status).json(data);
    };

    async getOrder(req, res) {
        const { orderId } = req.params;
        const data = await OrderService.findOrderById(orderId);
        const status = data.status ? data.status : 200;
        res.status(status).json(data);
    };
}

module.exports = new OrderController();