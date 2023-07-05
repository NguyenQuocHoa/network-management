const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");

router.get("/", (req, res, next) => {
    controller.getAccounts(req, res, next);
});

router.post("/login", (req, res, next) => {
    controller.getAccountByUsername(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getAccountById(req, res, next);
});

module.exports = router;
