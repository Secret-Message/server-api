module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const category = require("../controllers/category.controller.js");

    app.post("/api/createCategory", auth.loggedin, category.createCategory );
    app.delete("/api/deleteCategory", auth.loggedin, category.deleteCategory );
    app.patch("/api/updateCategory", auth.loggedin, category.updateCategory );
    app.get("/api/getCategoryChannels", auth.loggedin, category.getCategoryChannels);
};