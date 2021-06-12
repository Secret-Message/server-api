module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const channel = require("../controllers/channel.controller.js");

    app.post("/api/v1/servers/:serverId/categories/:categoryId/channels", auth.loggedin, channel.createChannel );
    app.delete("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId", auth.loggedin, channel.deleteChannel );
    app.patch("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId", auth.loggedin, channel.modifyChannel );
    app.post("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions", auth.loggedin, channel.asignPermisions);
    app.delete("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions/:permssionsOverwriteId", auth.loggedin, channel.removePermisions);
    app.patch("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions/:permssionsOverwriteId", auth.loggedin, channel.modifyPermissions);
    app.get("/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions", auth.loggedin, channel.getPermissions);
};
