
exports.sendSuccessMessage = (res, message, data) => {
    return res.status(200).json({
        status: 'success',
        message: message,
        data: data
    });
}

exports.sendErrorMessage = (res, code, message) => {
    res.status(code).json({
        status: 'error',
        message: message,
    });
}