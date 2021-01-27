const { sendSuccessMessage, sendErrorMessage } = require("../utils/responder");
const utils = require("../utils/utils");

exports.validate = (req, res) => {
  let { rule, data } = req.body;

  /* The next two lines make sure that the properties 'rule' and 'data' 
    are present.*/
  if (rule == null) return sendErrorMessage(res, "rule is required.", null);
  if (data == null) return sendErrorMessage(res, "data is required.", null);

  /* This line makes sure that 'rule' is a valid object */
  if (typeof rule != "object")
    return sendErrorMessage(res, "rule should be an object.", null);

  if (!["object", "string"].includes(typeof data)) {
    return sendErrorMessage(
      res,
      "data should either be an object, array or a string.",
      null
    );
  }

  /* Checks to make sure that the 'field', 'condition' and 'condition_value' 
  are all present in the rule object */
  var ruleFields = ["field", "condition", "condition_value"];
  for (var f of ruleFields) {
    if (rule[f] == null) {
      return sendErrorMessage(res, `rule.${f} of the rule is required.`, null);
    }
  }

  const { field, condition, condition_value } = rule;

  if (typeof field != "string")
    return sendErrorMessage(res, "rule.field should be a string.", null);

  if (typeof condition != "string")
    return sendErrorMessage(res, "rule.condition should be a string.", null);

  var message;
  let { isValid, value } = utils.checkCondition(res, rule, data);
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
