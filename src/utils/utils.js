const { sendSuccessMessage, sendErrorMessage } = require("../utils/responder");
const ld = require("lodash");

/*  This middleware function is used to check if
    an invalid JSON payload was passed. It catches
    the error from the previous middleware, which
    is [body-parser] in this case and sends the
    appropriate error to the client. */
exports.checkBody = (err, req, res, next) => {
  // console.error(err.stack);
  message = "Invalid JSON payload passed.";
  return sendErrorMessage(res, message, null);
};


exports.checkCondition = (res, rule, data) => {
  var value = data;
  var message;
  const { field, condition, condition_value } = rule;

  //to separate nested fields
  let nests = field.split(".");

  //The try block catches an error when a field is not present
  try {
    for (var i of nests) {
      value = value[i];
      if (!value) throw Error("Value is undefined.");
    }
  } catch (error) {
    message = `field ${field} is missing from data.`;
    return sendErrorMessage(res, message, null);
  }

  var isValid;
  switch (condition) {
    case "eq":
      isValid = ld.isEqual(value, condition_value);
      break;

    case "neq":
      isValid = !ld.isEqual(value, condition_value);
      break;

    case "gt":
      isValid = value > condition_value;
      break;

    case "gte":
      isValid = value >= condition_value;
      break;

    case "contains":
      isValid = ld.includes(value, condition_value);
      break;

    default:
      break;
  }
  return {
    isValid: isValid,
    value: value,
  };
};
