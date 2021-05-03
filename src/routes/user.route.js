module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const user = require("../controllers/user.controller.js");

    app.post("/api/login", auth.login);
    app.delete("/api/deleteUser", auth.loggedin, user.deleteUser);
    app.patch("/api/updateUser",  auth.loggedin, user.updateUser);
    app.get("/api/getUserServers", auth.loggedin, user.getUserServers);
    app.get("/api/getUserDMs", auth.loggedin, user.getUserDMs);
    app.get("/api/getUserFriends", auth.loggedin, user.getUserFriends);
    app.get("/api/getUserById", auth.loggedin, user.getUserById);
};