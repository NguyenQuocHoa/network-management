const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeKeeping.controller");

router.get("/", (req, res, next) => {
    controller.getTimeKeepings(req, res, next);
});

router.get("/getByTeam", (req, res, next) => {
    controller.getTimeKeepingByTeamId(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateTimeKeepingById(req, res, next);
});

module.exports = router;
