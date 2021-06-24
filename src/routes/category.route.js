module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const category = require("../controllers/category.controller.js");

    app.get("/api/v1/servers/:serverId/categories/:categoryId/channels", auth.loggedin, category.getChannels );
    app.post("/api/v1/servers/:serverId/categories", auth.loggedin, category.createCategory );
    app.delete("/api/v1/servers/:serverId/categories/:categoryId", auth.loggedin, category.deleteCategory );
    app.patch("/api/v1/servers/:serverId/categories/:categoryId", auth.loggedin, category.modifyCategory);
    app.post("/api/v1/servers/:serverId/categories/:categoryId/permisions", auth.loggedin, category.asignPermisions);
    app.delete("/api/v1/servers/:serverId/categories/:categoryId/permisions/:permssionsOverwriteId", auth.loggedin, category.removePermisions);
    app.patch("/api/v1/servers/:serverId/categories/:categoryId/permisions/:permssionsOverwriteId", auth.loggedin, category.modifyPermissions);
    app.get("/api/v1/servers/:serverId/categories/:categoryId/permisions", auth.loggedin, category.getPermissions);
};
