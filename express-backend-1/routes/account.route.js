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

router.post("/insert", (req, res, next) => {
    controller.insertAccount(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateAccountById(req, res, next);
});

router.put("/update-status", (req, res, next) => {
    controller.updateAccountStatus(req, res, next);
});

router.delete("/delete/:id", (req, res, next) => {
    controller.deleteAccountById(req, res, next);
});

module.exports = router;
