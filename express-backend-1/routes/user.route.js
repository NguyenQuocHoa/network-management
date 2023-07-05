const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

function middleware1(req, res, next) {
  console.log("middleware1 running...");
  next();
}

function middleware2(req, res, next) {
  console.log("middleware2 running...");
  res.send("hello");
}

router.get("/test", middleware1, middleware2);

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.getCreate);

router.post("/create", controller.postCreate);

router.get("/:id", controller.get);

module.exports = router;
