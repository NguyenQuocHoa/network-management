const MonthlyDAO = require("../dao/monthly.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getMonthlies
 * @description: get all monthly by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getMonthlies = (req, res, next) => {
    let kw = req.query.kw;
    MonthlyDAO.getMonthlies((err, monthlies) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(monthlies);
    }, kw);
};

/**
 * @name: getMonthlyById
 * @description: get monthly by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getMonthlyById = (req, res, next) => {
    let monthlyId = req.params.id;
    MonthlyDAO.getMonthlyById((err, monthly) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!monthly) {
            loggerErrorMiddleware(generateMsgNotFound(monthlyId), req, res, next);
            return;
        }
        return res.send(monthly);
    }, monthlyId);
};

/**
 * @name: insertMonthly
 * @description: insert monthly
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.insertMonthly = (req, res, next) => {
    let monthlyPayload = MonthlyDAO.convertObject(req.body);
    MonthlyDAO.insertMonthly((err, insertId) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!insertId) {
            loggerErrorMiddleware(generateMsgNotFound(monthlyId), req, res, next);
            return;
        }
        return res.status(201).send({ monthlyId: insertId });
    }, monthlyPayload);
};

/**
 * @name: updateMonthlyById
 * @description: update monthly by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateMonthlyById = (req, res, next) => {
    let monthlyId = req.params.id;
    let monthlyPayload = MonthlyDAO.convertObject(req.body);
    MonthlyDAO.updateMonthlyById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(monthlyId), req, res, next);
                return;
            }
            return res.status(200).send();
        },
        monthlyId,
        monthlyPayload
    );
};

const generateMsgErr = (err) => {
    return {
        controllerName: "Monthly controller",
        message: err,
    };
};

const generateMsgNotFound = (monthlyId) => {
    return {
        controllerName: "Monthly controller",
        message: `Not found object have id ${monthlyId}`,
    };
};
