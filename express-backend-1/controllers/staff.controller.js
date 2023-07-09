const StaffDAO = require("../dao/staff.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getStaffs
 * @description: get all staff by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getStaffs = (req, res, next) => {
    let kw = req.query.kw;
    StaffDAO.getStaffs((err, staffs) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(staffs);
    }, kw);
};

/**
 * @name: getStaffById
 * @description: get staff by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getStaffById = (req, res, next) => {
    let staffId = req.params.id;
    StaffDAO.getStaffById((err, staff) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!staff) {
            loggerErrorMiddleware(generateMsgNotFound(staffId), req, res, next);
            return;
        }
        return res.send(staff);
    }, staffId);
};

/**
 * @name: insertStaff
 * @description: insert staff
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.insertStaff = (req, res, next) => {
    let staffPayload = StaffDAO.convertObject(req.body);
    StaffDAO.insertStaff((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!affectedRows) {
            loggerErrorMiddleware(generateMsgNotFound(staffId), req, res, next);
            return;
        }
        return res.status(201).send();
    }, staffPayload);
};

/**
 * @name: updateStaffById
 * @description: update staff by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateStaffById = (req, res, next) => {
    let staffId = req.params.id;
    let staffPayload = StaffDAO.convertObject(req.body);
    StaffDAO.updateStaffById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(staffId), req, res, next);
                return;
            }
            return res.status(200).send();
        },
        staffId,
        staffPayload
    );
};

/**
 * @name: deleteStaffById
 * @description: delete staff by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.deleteStaffById = (req, res, next) => {
    let staffId = req.params.id;
    StaffDAO.deleteStaffById((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!affectedRows) {
            loggerErrorMiddleware(generateMsgNotFound(staffId), req, res, next);
            return;
        }
        return res.status(200).send();
    }, staffId);
};

const generateMsgErr = (err) => {
    return {
        controllerName: "Staff controller",
        message: err,
    };
};

const generateMsgNotFound = (staffId) => {
    return {
        controllerName: "Staff controller",
        message: `Not found object have id ${staffId}`,
    };
};
