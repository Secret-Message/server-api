module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const server = require("../controllers/server.controller.js");

    app.post("/api/v1/servers", auth.loggedin, server.createServer );
    app.delete("/api/v1/servers/:serverId", auth.loggedin, server.deleteServer );
    app.patch("/api/v1/servers/:serverId", auth.loggedin, server.modifyServer );
    app.get("/api/v1/servers/:serverId/members", auth.loggedin, server.getMembers );
    app.get("/api/v1/servers/:serverId/bannedUsers", auth.loggedin, server.getBanned );
    app.get("/api/v1/servers/:serverId/categories", auth.loggedin, server.getCategories );
    app.post("/api/v1/servers/:serverId/invites", auth.loggedin, server.createInvite );
    app.post("/api/v1/servers/:serverId/roles", auth.loggedin, server.getRoles );
};
