const AuthorizationService = require('../authorization/authorization.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const data = AuthorizationService.validateAccess(token);

        req.user = data;

        next();
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'});
    }
};