class HandledHttpError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const {
        statusCode = 500,
        message = 'Unknown error'
    } = err || {};
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

module.exports = {
    HandledHttpError,
    handleError
};
