const ModelDAO = require("./model.dao");

/**
 * @name: class Notify
 * @description: dao for model notify
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 */
class NotifyDAO {
    /**
     * @name: getNotifies
     * @description: get list notify from database
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getNotifies = (result, kw = null) => {
        ModelDAO.getDataList("notify", "message", NotifyDAO.#convertObject, result, kw);
    };

    /**
     * @name: getNotifyById
     * @description : get notify by id
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {result} function callback get data
     * @param: {notifyId} id of object want to get
     * @return: {result} callback
     */
    static getNotifyById = (result, notifyId) => {
        ModelDAO.getObjectById("notify", NotifyDAO.#convertObject, result, notifyId);
    };

    /**
     * @name: convertObject
     * @description : convert raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {obj} object want to convert
     * @return: {obj} object after convert
     */
    static #convertObject = (obj) => {
        return {
            id: obj.id,
            message: obj.message,
            linkNotify: obj.link_notify,
            type: obj.type,
            minutesAgo: obj.minutes_Ago,
            isView: obj.is_view,
        };
    };
}

module.exports = NotifyDAO;
