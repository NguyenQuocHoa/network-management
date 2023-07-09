const express = require("express");
const router = express.Router();
const controller = require("../controllers/monthly.controller");

router.get("/", (req, res, next) => {
    controller.getMonthlies(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getMonthlyById(req, res, next);
});

router.post("/insert", (req, res, next) => {
    controller.insertMonthly(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateMonthlyById(req, res, next);
});

module.exports = router;
