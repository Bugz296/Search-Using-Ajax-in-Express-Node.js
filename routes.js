const Express = require("express");
const Router = Express.Router();
const SearchesController = require(`./controllers/searches`);
Router.get("/", SearchesController.index);
Router.post("/search", SearchesController.search);

module.exports = Router;