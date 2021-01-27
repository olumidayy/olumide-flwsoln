const responder = require('../utils/responder');

exports.validate = (req, res) => {
    console.log(req.body);
    let { rule, data } = req.body;
    if (!rule) return responder.sendErrorMessage(res, 400, 'rule is required.');
    if (!data) return responder.sendErrorMessage(res, 400, 'data is required.');

    if(typeof rule != 'object') return responder.sendErrorMessage(res, 400, 'rule should be an object.');

    ['field', 'condition', 'condition_value'].forEach((field) => {
        if (!rule[field]) return responder.sendErrorMessage(res, 400, `${field} of the rule object is required.`);
    });
}