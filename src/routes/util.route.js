module.exports = app => {
    const util = require("../controllers/util.controller.js");

    app.get("/api/v1/getCupOfCoffe", util.requestCoffe );
};
