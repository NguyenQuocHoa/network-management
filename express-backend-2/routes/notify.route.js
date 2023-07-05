const express = require("express");
const router = express.Router();
const controller = require("../controllers/notify.controller");

router.get("/", (req, res, next) => {
    controller.getNotifies(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getNotifyById(req, res, next);
});

module.exports = router;
