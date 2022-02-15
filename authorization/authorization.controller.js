const AuthorizationService = require('./authorization.service');

class AuthorizationController {

    async signIn(req, res, next) {
        const data = await AuthorizationService.signIn(req.body, next);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }

    async signUp(req, res) {
        const data = await AuthorizationService.signUp(req.body);
        const status = data.status ? data.status : 201
        res.status(status).json(data);
    }

    async resetPassword(req, res) {
        const { userId } = req.params;

        const data = await AuthorizationService.resetPassword(userId, req.body);
        const status = data.status ? data.status : 201
        res.status(status).json(data);
    }

    async refreshTokens(req, res) {
        const data = await AuthorizationService.refreshTokens(req.body);
        const status = data.status ? data.status : 200
        res.status(status).json(data);
    }
}

module.exports = new AuthorizationController();