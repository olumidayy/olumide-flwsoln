const responder = require("../utils/responder");

exports.home = (req, res) => {
    const message = "My Rule-Validation API";
    const data = {
        name: "Olumide Nwosu",
        github: "@olumidayy",
        email: "olumidenwosu@gmail.com",
        mobile: "09082950323",
        twitter: "@olumidenwosu",
    };
    return responder.sendSuccessMessage(res, message, data);
};
