const DailyDAO = require("../dao/daily.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getDailies
 * @description: get all daily by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getDailies = (req, res, next) => {
    let kw = req.query.kw;
    DailyDAO.getDailies((err, monthlies) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(monthlies);
    }, kw);
};

/**
 * @name: getDailyById
 * @description: get daily by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getDailyById = (req, res, next) => {
    let dailyId = req.params.id;
    DailyDAO.getDailyById((err, daily) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!daily) {
            loggerErrorMiddleware(generateMsgNotFound(dailyId), req, res, next);
            return;
        }
        return res.send(daily);
    }, dailyId);
};

/**
 * @name: updateDailyById
 * @description: update daily by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateDailyById = (req, res, next) => {
    let dailyId = req.params.id;
    let dailyPayload = DailyDAO.convertObject(req.body);
    DailyDAO.updateDailyById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(dailyId), req, res, next);
                return;
            }
            return res.status(200).send();
        },
        dailyId,
        dailyPayload
    );
};

const generateMsgErr = (err) => {
    return {
        controllerName: "Daily controller",
        message: err,
    };
};

const generateMsgNotFound = (dailyId) => {
    return {
        controllerName: "Daily controller",
        message: `Not found object have id ${dailyId}`,
    };
};
