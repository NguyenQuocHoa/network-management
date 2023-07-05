const NotifyDAO = require("../dao/notify.dao");

/**
 * @name: getNotifies
 * @description: get all notify by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getNotifies = (req, res, next) => {
    let kw = req.query.kw;
    NotifyDAO.getNotifies((err, notifies) => {
        if (err) {
            next({
                controllerName: "Notify controller",
                message: err,
            });
            return;
        }
        return res.send(notifies);
    }, kw);
};

/**
 * @name: getNotifyById
 * @description: get notify by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getNotifyById = (req, res, next) => {
    let notifyId = req.params.id;
    NotifyDAO.getNotifyById((err, notify) => {
        if (err) {
            next({
                controllerName: "Notify controller",
                message: err,
            });
            return;
        }
        if (!notify) {
            next({
                controllerName: "Notify controller",
                message: `Not found object have id ${notifyId}`,
            });
            return;
        }
        return res.send(notify);
    }, notifyId);
};
