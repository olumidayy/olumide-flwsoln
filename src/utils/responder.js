
exports.sendSuccessMessage = (res, message, data) => {
    return res.status(200).json({
        status: 'success',
        message: message,
        data: data
    });
}

exports.sendErrorMessage = (res, message, data) => {
    res.status(400).json({
        status: 'error',
        message: message,
        data: data
    });
}

