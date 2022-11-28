const productsRoutes = require("express").Router();
const productsController = require("../controllers/productsController");

productsRoutes.get("/",productsController.select);
productsRoutes.post("/",productsController.add);
productsRoutes.put("/:id",productsController.update);
productsRoutes.delete("/:id",productsController.delete);
productsRoutes.patch("/:id",productsController.restore);

module.exports = productsRoutes;