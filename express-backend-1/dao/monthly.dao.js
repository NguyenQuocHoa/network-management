const ModelDAO = require("./model.dao");

/**
 * @name: class Monthly
 * @description: dao for model monthly
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 */
class MonthlyDAO {
    /**
     * @name: getMonthlies
     * @description: get list monthly from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getMonthlies = (result, kw = null) => {
        ModelDAO.getDataList("monthly", null, MonthlyDAO.convertObject, result, kw);
    };

    /**
     * @name: getMonthlyById
     * @description: get monthly by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {monthlyId} id of object want to get
     * @return: {result} callback
     */
    static getMonthlyById = (result, monthlyId) => {
        ModelDAO.getObjectByIdWithField(
            "monthly",
            ["id", "workMonth", "description"],
            MonthlyDAO.convertObject,
            result,
            monthlyId
        );
    };

    /**
     * @name: insertMonthly
     * @description: insert monthly by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {monthly} monthly object want to insert
     * @return: {result} callback
     */
    static insertMonthly = (result, monthly) => {
        let sql = `INSERT INTO monthly (workMonth, description) 
            VALUES ('${monthly.workMonth}', '${monthly.description}');`;
        ModelDAO.insertObjectWithSql(MonthlyDAO.convertObject, sql, result);
    };

    /**
     * @name: updateMonthlyById
     * @description: update monthly by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {monthly} monthly object want to update
     * @return: {result} callback
     */
    static updateMonthlyById = (result, monthlyId, monthly) => {
        let sql = `UPDATE monthly SET description = '${monthly.description}' WHERE id = ${monthlyId}`;
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
            workMonth: obj.workMonth,
            description: obj.description,
        };
    };
}

module.exports = MonthlyDAO;
