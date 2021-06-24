module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const friend = require("../controllers/friend.controller.js");
    const user = require("../controllers/user.controller.js");

    app.get("/api/v1/users/byFriendCode/:friendCode", auth.loggedin, user.getUserByFriendCode );
    app.post("/api/v1/users/sendFriendRequest", auth.loggedin, friend.sendFriendRequest );
    app.get("/api/v1/users/myFriendRequest", auth.loggedin, friend.getRequests );
    app.post("/api/v1/users/acceptFriendRequest", auth.loggedin, friend.acceptRequest );
    app.post("/api/v1/users/rejectFriendRequest", auth.loggedin, friend.rejectRequest );
};
