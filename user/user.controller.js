const UserService = require('./user.service');

class UserController {

    async getUser(req, res) {
        const { _id } = req.user;

        const data = await UserService.findUserById(_id);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async editUser(req, res) {
        const { _id } = req.user;

        const data = await UserService.editUser(_id, req.body);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }
}

module.exports = new UserController();