const Order = require('./order.model');
const User = require('../user/user.model');

class OrderService {
    async createOrder(dto) {
        try {
            const {
                userId,
                street,
                house,
                entrance,
                floor,
                apartment,
                intercom
            } = dto
            const numberOrder = await Order.collection.find().count()
            const newOrder = await Order.create({
                ...dto,
                date: Date.now(),
                number: numberOrder + 1,
            })

            if (userId) {
                const { orders } = await User.findById(userId);
                const newOrderId = newOrder._id.toHexString()

                await User.findByIdAndUpdate(userId, {
                    street,
                    house,
                    entrance,
                    floor,
                    apartment,
                    intercom,
                    orders: [...orders, newOrderId]
                }, {new: true});
            }
            return newOrder;
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async findOrdersById(dto) {
        try {
            let result = []
            for (const id of dto) {
                const order = await Order.findById(id);
                result.unshift(order)
            }

            return result
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }

    async findOrderById(id) {
        try {
            const result = await Order.findById(id);
            return result
        } catch (e) {
            return {
                message: 'На сервере произошла ошибка. Попробуйте позже',
                error: true,
                status: 500
            }
        }
    }
}

module.exports = new OrderService();