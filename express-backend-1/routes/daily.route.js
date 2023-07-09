const express = require("express");
const router = express.Router();
const controller = require("../controllers/daily.controller");

router.get("/", (req, res, next) => {
    controller.getDailies(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getDailyById(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateDailyById(req, res, next);
});

module.exports = router;
