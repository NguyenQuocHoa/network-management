const ModelDAO = require("./model.dao");

/**
 * @name: class Job
 * @description: dao for model job
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 */
class JobDAO {
    /**
     * @name: getJobs
     * @description: get list job from database
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getJobs = (result, kw = null) => {
        ModelDAO.getDataList("job", "username", JobDAO.#convertObject, result, kw);
    };

    /**
     * @name: getJobById
     * @description: get job by id
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {result} function callback get data
     * @param: {jobId} id of object want to get
     * @return: {result} callback
     */
    static getJobById = (result, jobId) => {
        ModelDAO.getObjectById("job", JobDAO.#convertObject, result, jobId);
    };

    /**
     * @name: convertObject
     * @description: convert raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {obj} object want to convert
     * @return: {obj} object after convert
     */
    static #convertObject = (obj) => {
        return {
            id: obj.id,
        };
    };
}

module.exports = JobDAO;
