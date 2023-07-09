const express = require("express");
const router = express.Router();
const controller = require("../controllers/team.controller");

router.get("/", (req, res, next) => {
    controller.getTeams(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getTeamById(req, res, next);
});

router.post("/insert", (req, res, next) => {
    controller.insertTeam(req, res, next);
});

router.put("/update/:id", (req, res, next) => {
    controller.updateTeamById(req, res, next);
});

router.delete("/delete/:id", (req, res, next) => {
    controller.deleteTeamById(req, res, next);
});

module.exports = router;
