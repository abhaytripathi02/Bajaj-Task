const requestValidator = (req, res, next) => {
    if (req.method === 'POST') {
        if (!req.body || !req.body.data) {
            return res.status(400).json({
                is_success: false,
                error: "Request body must contain 'data' field"
            });
        }
    }
    next();
};

module.exports = requestValidator;