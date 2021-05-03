module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const message = require("../controllers/message.controller.js");

    app.post("/api/sendMessage", auth.loggedin, message.createMessage );
    app.delete("/api/deleteMessage", auth.loggedin, message.deleteMessage );
    app.patch("/api/editMessage", auth.loggedin, message.updateMessage );
};