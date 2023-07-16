const express = require("express");
const router = express.Router();
const controller = require("../controllers/staff.controller");

router.get("/", (req, res, next) => {
    controller.getStaffs(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getStaffById(req, res, next);
});

router.post("/insert", (req, res, next) => {
    controller.insertStaff(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateStaffById(req, res, next);
});

router.put("/update-status", (req, res, next) => {
    controller.updateStaffStatus(req, res, next);
});

router.delete("/delete/:id", (req, res, next) => {
    controller.deleteStaffById(req, res, next);
});

module.exports = router;
