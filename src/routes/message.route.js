module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const message = require("../controllers/message.controller.js");
    const channel = require("../controllers/channel.controller.js");

    app.post("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages", auth.loggedin, message.send );
    app.delete("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId", auth.loggedin, message.deleteMessage );
    app.patch("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId", auth.loggedin, message.modifyMessage );
    app.get("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages", auth.loggedin, channel.getMessages);
};
