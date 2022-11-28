const adminRoute = require("express").Router();
const adminController = require("../controllers/adminController");
const middleware = require("../middleware/middlewares");

adminRoute.get("/",adminController.select);
adminRoute.post("/login",adminController.login);
adminRoute.post("/",middleware.checkAuth,adminController.add);
adminRoute.delete("/:id",adminController.delete);
adminRoute.patch("/:id",adminController.restore);
// -----------------------------------------------
adminRoute.get("/product",adminController.ProductView);
adminRoute.post("/product",adminController.ProductInsert);
adminRoute.put("/product/:id",adminController.UpdateProduct);
adminRoute.delete("/product/:id",adminController.DeleteProduct);
adminRoute.patch("/product/:id",adminController.RestoreProduct);

module.exports = adminRoute;