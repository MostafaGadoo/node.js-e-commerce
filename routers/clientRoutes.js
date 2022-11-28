const clientRoute = require("express").Router();
const clientController = require("../controllers/clientController");
// const middleware = require("../middleware/middlewares");

clientRoute.get('/', clientController.select);
clientRoute.post('/register', clientController.insert); //register 
clientRoute.post("/login",clientController.login);
clientRoute.delete('/:id', clientController.delete);
clientRoute.patch('/:id', clientController.restore);
clientRoute.put('/', clientController.update);
clientRoute.get("/product",clientController.ViewPoroducts);

module.exports = clientRoute;


