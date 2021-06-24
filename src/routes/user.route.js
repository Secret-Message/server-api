module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const user = require("../controllers/user.controller.js");

    app.post("/api/v1/login", auth.login );
    app.get("/api/v1/users", auth.loggedin, user.getCurrentUser );
    app.get("/api/v1/users/:userUUID", auth.loggedin, user.getUser );
    app.patch("/api/v1/users", auth.loggedin, user.modifyCurrentUser );
    app.delete("/api/v1/users", auth.loggedin, user.deleteCurrentUser );
    app.get("/api/v1/users/:userUUID/sharedServers", auth.loggedin, user.getSharedServers );
    app.get("/api/v1/users/:userUUID/sharedFriends", auth.loggedin, user.getSharedFriends );
    app.get("/api/v1/users/servers", auth.loggedin, user.getServers );
    app.get("/api/v1/users/friends", auth.loggedin, user.getFriends );
    app.post("/api/v1/servers/createDM", auth.loggedin, user.createDM );
};
