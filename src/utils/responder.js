
exports.sendSuccessMessage = (res, message, data) => {
    return res.status(200).json({
        status: 'success',
        message: formatStr(message),
        data: data
    });
}

exports.sendErrorMessage = (res, message, data) => {
    res.status(400).json({
        status: 'error',
        message: formatStr(message),
        data: data
    });
}

function formatStr(str) {
    if(str[str.length-1] != '.'){
        str += '.';
    }
    return str;
}