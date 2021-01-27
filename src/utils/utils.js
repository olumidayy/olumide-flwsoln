const { sendSuccessMessage, sendErrorMessage} = require("../utils/responder");
const ld = require('lodash');

/*  This middleware function is used to check if
    an invalid JSON payload was passed. It catches
    the error from the previous middleware, which
    is [body-parser] in this case and sends the
    appropriate error to the client. */
exports.checkBody = (err, req, res, next) => {
    console.error(err.stack);
    message = 'Invalid JSON payload passed.';
    return sendErrorMessage(res, message, null);
}


exports.checkCondition = (res, rule, data) => {
    var value = data;
    var message;
    const { field, condition, condition_value } = rule;

    //if the field property is empty
    if(field.trim() == '') {
        /* What this implies is that if the field property of the
           rule object is an empty string, the comparison is done
           between the condition_value and the data field value
           directly. */
    }
    else {
        //to separate nested fields
        let nests = field.split('.');
        console.log(nests);

        //The try block catches an error when a field is not present
        try {
            for(var i of nests) {
                value = value[i];
                console.log(value);
                if(!value) throw Error('Value is undefined.')
            }
        } catch (error) {
            message = `field ${field} is missing from data.`
            return sendErrorMessage(res, message, null);
        }
    }

    //This checks if the field and the condition value are of the same type
    if(typeof value !== typeof condition_value){
        let type = typeof condition_value;
        message = `${field == '' ? 'data': field} should be ${'aeiou'.includes(type[0]) ? 'an' : 'a'} ${type}.`;
        return sendErrorMessage(res, message, null);
    }
    var isValid;
    switch (condition) {
        case 'eq':
            isValid = ld.isEqual(value, condition_value);
            break;

        case 'neq':
            isValid = !ld.isEqual(value, condition_value);
            break;

        case 'gt':
            isValid = value > condition_value;
            break;

        case 'gte':
            isValid = value >= condition_value;
            break;
        
        case 'contains':
            isValid = value.includes(condition_value);
            break;
    
        default:
            break;
    }
    return {
        isValid: isValid,
        value: value
    };
}
