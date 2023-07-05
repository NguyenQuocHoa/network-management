const express = require("express");
const router = express.Router();
const controller = require("../controllers/job.controller");

router.get("/", (req, res, next) => {
    controller.getJobs(req, res, next);
});

router.get("/:id", (req, res, next) => {
    controller.getJobById(req, res, next);
});

module.exports = router;
