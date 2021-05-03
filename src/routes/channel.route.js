module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const channel = require("../controllers/channel.controller.js");

    app.post("/api/createChannel", auth.loggedin, channel.createChannel );
    app.delete("/api/deleteChannel", auth.loggedin, channel.deleteChannel );
    app.patch("/api/updateChannel", auth.loggedin, channel.updateChannel );
    app.get("/api/getChannelMessages", auth.loggedin, channel.getChannelMessages);
};