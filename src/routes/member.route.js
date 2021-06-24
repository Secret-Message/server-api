module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const member = require("../controllers/member.controller.js");

    app.post("/api/v1/invites/:inviteId", auth.loggedin, member.join );
    app.post("/api/v1/servers/:serverId/leave", auth.loggedin, member.leave );
    app.post("/api/v1/servers/:serverId/members/:memberId/ban", auth.loggedin, member.ban );
    app.post("/api/v1/servers/:serverId/members/:memberId/kic", auth.loggedin, member.kick);
    app.get("/api/v1/servers/:serverId/members/:memberId/roles", auth.loggedin, member.getRoles);
};
