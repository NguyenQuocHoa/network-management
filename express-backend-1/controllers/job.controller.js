const JobDAO = require("../dao/job.dao");

/**
 * @name: getJobs
 * @description: get all job by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getJobs = (req, res, next) => {
    let kw = req.query.kw;
    JobDAO.getJobs((err, jobs) => {
        if (err) {
            next({
                controllerName: "Job controller",
                message: err,
            });
            return;
        }
        return res.send(jobs);
    }, kw);
};

/**
 * @name: getJobById
 * @description: get job by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getJobById = (req, res, next) => {
    let jobId = req.params.id;
    JobDAO.getJobById((err, job) => {
        if (err) {
            next({
                controllerName: "Job controller",
                message: err,
            });
            return;
        }
        if (!job) {
            next({
                controllerName: "Job controller",
                message: `Not found object have id ${notifyId}`,
            });
            return;
        }
        return res.send(job);
    }, jobId);
};
