module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const util = require("../controllers/util.controller.js");

    app.get("/api/v1/getCupOfCoffe", auth.loggedin, util.requestCoffe );
};
