module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const server = require("../controllers/server.controller.js");

    app.post("/api/createServer", auth.loggedin, server.createServer );
    app.delete("/api/deleteServer", auth.loggedin, server.deleteServer );
    app.patch("/api/updateServer", auth.loggedin, server.updateServer );
    app.get("/api/getServerCategories", auth.loggedin, server.getServerCategories);
    app.get("/api/getServerMembers",  auth.loggedin, server.getServerMembers);
    app.post("/api/createDM",  auth.loggedin, server.createDM);
    app.post("/api/joinServer/:serverUuid",  auth.loggedin, server.joinServer);
    app.post("/api/leaveServer/:serverUuid",  auth.loggedin, server.leaveServer);
};