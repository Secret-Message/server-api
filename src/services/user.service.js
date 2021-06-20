const Service = require("./Service.js")

class UserService extends Service {
    constructor(model) {
        super(model);
    }
}

module.exports = UserService;