module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const role = require("../controllers/role.controller.js");
    const member = require("../controllers/member.controller.js");

    app.post("/api/v1/servers/:serverId/roles", auth.loggedin, role.createRole );
    app.delete("/api/v1/servers/:serverId/roles/:roleId", auth.loggedin, role.deleteRole );
    app.patch("/api/v1/servers/:serverId/roles/:roleId", auth.loggedin, role.modifyRole );
    app.post("/api/v1/servers/:serverId/members/:memberId/roles", auth.loggedin, member.assignRole);
    app.delete("/api/v1/servers/:serverId/members/:memberId/roles/:roleAsignId", auth.loggedin, member.removeRole);
};
