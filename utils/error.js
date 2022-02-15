class ApiError {
    static answer(message, code) {
        return {
            message: message,
            error: true,
            status: code
        }
    }
}

module.exports = ApiError