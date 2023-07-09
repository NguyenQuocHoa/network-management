const ModelDAO = require("./model.dao");
const connection = require("../mysql");

/**
 * @name: class Daily
 * @description: dao for model daily
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 */
class DailyDAO {
    /**
     * @name: getDailies
     * @description: get list daily from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getDailies = (result, kw = null) => {
        ModelDAO.getDataList("daily", null, DailyDAO.convertObject, result, kw);
    };

    /**
     * @name: getDailyById
     * @description: get daily by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {dailyId} id of object want to get
     * @return: {result} callback
     */
    static getDailyById = (result, dailyId) => {
        ModelDAO.getObjectByIdWithField(
            "daily",
            ["id", "workDate", "description"],
            DailyDAO.convertObject,
            result,
            dailyId
        );
    };

    /**
     * @name: updateDailyById
     * @description: update daily by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {daily} daily object want to update
     * @return: {result} callback
     */
    static updateDailyById = (result, dailyId, daily) => {
        let sql = `UPDATE daily SET description = '${daily.description}' WHERE id = ${dailyId}`;
        ModelDAO.updateObjectByIdWithSql(sql, result);
    };

    /**
     * @name: convertObject
     * @description: convert raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {obj} object want to convert
     * @return: {obj} object after convert
     */
    static convertObject = (obj) => {
        return {
            id: obj.id,
            workDate: obj.workDate,
            description: obj.description,
        };
    };
}

module.exports = DailyDAO;
