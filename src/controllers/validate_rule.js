const { sendSuccessMessage, sendErrorMessage } = require("../utils/responder");
const utils = require("../utils/utils");

exports.validate = (req, res) => {
  let { rule, data } = req.body;

  console.log(rule, data);

  /* The next two lines make sure that the properties 'rule' and 'data' 
    are present.*/
  if (rule == null) return sendErrorMessage(res, "rule is required.", null);
  if (data == null) return sendErrorMessage(res, "data is required.", null);

  /* This line makes sure that 'rule' and 'data' are valid objects */
  if (typeof rule != "object")
    return sendErrorMessage(res, "rule should be an object.", null);
  if (typeof data != "object") {
    return sendErrorMessage(res, "data should be an object.", null);
  }

  /* Checks to make sure that the 'field', 'condition' and 'condition_value' 
  are all present in the rule object */
  ["field", "condition", "condition_value"].forEach((field) => {
    if (!rule[field]) {
      return sendErrorMessage(
        res,
        `field '${field}' of the rule object is required.`,
        null
      );
    }
  });

  var message;
  let { isValid, value } = utils.checkCondition(res, rule, data);
  const { field, condition, condition_value } = rule;
  if (isValid) {
    message = `field ${field} successfully validated.`;
    data = {
      validation: {
        error: false,
        field: field,
        field_value: value,
        condition: condition,
        condition_value: condition_value,
      },
    };
    return sendSuccessMessage(res, message, data);
  }
  message = `field ${field} failed validation.`;
  data = {
    validation: {
      error: true,
      field: field,
      field_value: value,
      condition: condition,
      condition_value: condition_value,
    },
  };
  return sendErrorMessage(res, message, data);
};
