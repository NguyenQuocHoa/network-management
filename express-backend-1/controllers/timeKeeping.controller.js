const TimeKeepingDAO = require("../dao/timeKeeping.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getTimeKeepings
 * @description: get all timeKeeping by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/10
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getTimeKeepings = (req, res, next) => {
    let kw = req.query.kw;
    TimeKeepingDAO.getTimeKeepings((err, timeKeepings) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(timeKeepings);
    }, kw);
};

/**
 * @name: getTimeKeepingByTeamId
 * @description: get all timeKeeping by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/10
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getTimeKeepingByTeamId = (req, res, next) => {
    let teamId = req.query.teamId;
    TimeKeepingDAO.getTimeKeepingByTeamId((err, timeKeepings) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(timeKeepings);
    }, teamId);
};

/**
 * @name: getTimeKeepingById
 * @description: get time keeping by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getTimeKeepingById = (req, res, next) => {
    let timeKeepingId = req.params.id;
    TimeKeepingDAO.getTimeKeepingById((err, timeKeeping) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!timeKeeping) {
            loggerErrorMiddleware(generateMsgNotFound(timeKeepingId), req, res, next);
            return;
        }
        return res.send(timeKeeping);
    }, timeKeepingId);
};

/**
 * @name: updateTimeKeepingById
 * @description: update timeKeeping by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/10
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateTimeKeepingById = (req, res, next) => {
    let timeKeepingId = req.params.id;
    let timeKeepingPayload = TimeKeepingDAO.convertObject(req.body);
    TimeKeepingDAO.updateTimeKeepingById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(timeKeepingId), req, res, next);
                return;
            }
            return res.status(200).send();
        },
        timeKeepingId,
        timeKeepingPayload
    );
};

/**
 * @name: updateTimeKeepingStatus
 * @description: update timeKeeping status by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateTimeKeepingStatus = (req, res, next) => {
    let lstTimeKeeping = req.body?.lstTimeKeeping?.map((timeKeeping) =>
        TimeKeepingDAO.convertObject(timeKeeping)
    );
    TimeKeepingDAO.updateTimeKeepingStatus((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.status(200).send();
    }, lstTimeKeeping);
};

const generateMsgErr = (err) => {
    return {
        controllerName: "TimeKeeping controller",
        message: err,
    };
};

const generateMsgNotFound = (timeKeepingId) => {
    return {
        controllerName: "TimeKeeping controller",
        message: `Not found object have id ${timeKeepingId}`,
    };
};
