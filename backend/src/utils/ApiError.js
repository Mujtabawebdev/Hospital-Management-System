class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        if (typeof statusCode === "string") {
            [message, statusCode] = [statusCode, message];
        }

        super(message);
        this.statusCode = statusCode || 500;
        this.message = message || "Internal Server Error";
        this.errors = errors;
        this.success = false;
    }
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];

    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
        statusCode = 409;
    }
    if (err.name === "JsonWebTokenError") {
        message = "Authentication token is invalid";
        statusCode = 401;
    }
    if (err.name === "TokenExpiredError") {
        message = "Authentication token has expired";
        statusCode = 401;
    }
    if (err.name === "CastError") {
        message = `Invalid ${err.path}`;
        statusCode = 400;
    }

    const errorMessage = err.errors && !Array.isArray(err.errors)
        ? Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : message;

    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errors: Array.isArray(errors) ? errors : [],
    });
};

export { ApiError };
