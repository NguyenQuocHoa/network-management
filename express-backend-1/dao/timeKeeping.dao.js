const ModelDAO = require("./model.dao");

/**
 * @name: class TimeKeeping
 * @description: dao for model timeKeeping
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/10
 */
class TimeKeepingDAO {
    /**
     * @name: getTimeKeepings
     * @description: get list timeKeeping from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/10
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getTimeKeepings = (result, kw = null) => {
        ModelDAO.getDataList("timeKeeping", null, TimeKeepingDAO.convertObject, result, kw);
    };

    /**
     * @name: getTimeKeepingByTeamId
     * @description: get list timeKeeping by team id from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/10
     * @param: {result} function callback get data
     * @param: {teamId} team id for search
     * @return: {result} callback
     */
    static getTimeKeepingByTeamId = (result, teamId = null) => {
        let sql = `SELECT t.*, s.staffName, s.phone FROM timekeeping AS t 
                   INNER JOIN staff AS s
                   ON t.staffId = s.id
                   INNER JOIN daily AS d
                   ON t.dailyId = d.id
                   WHERE s.teamId = ${teamId}
                   AND d.workDate = CURDATE();`;
        ModelDAO.getDataListWithSql(TimeKeepingDAO.convertObject, sql, result);
    };

    /**
     * @name: getTimeKeepingById
     * @description: get time keeping by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {timeKeepingId} id of object want to get
     * @return: {result} callback
     */
    static getTimeKeepingById = (result, timeKeepingId) => {
        let sql = `SELECT t.*, s.staffName, s.phone FROM timekeeping AS t 
            INNER JOIN staff AS s
            ON t.staffId = s.id
            INNER JOIN daily AS d
            ON t.dailyId = d.id
            WHERE t.id = ${timeKeepingId};`;
        ModelDAO.getObjectByIdWithSql(TimeKeepingDAO.convertObject, sql, result);
    };

    /**
     * @name: updateTimeKeepingById
     * @description: update timeKeeping by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/10
     * @param: {result} function callback get data
     * @param: {timeKeeping} timeKeeping object want to update
     * @return: {result} callback
     */
    static updateTimeKeepingById = (result, timeKeepingId, timeKeeping) => {
        let sql = `UPDATE timeKeeping SET isCheck = 
            '${timeKeeping.isCheck}', description = '${timeKeeping.description}' WHERE id = ${timeKeepingId}`;
        ModelDAO.updateObjectByIdWithSql(sql, result);
    };

    /**
     * @name: updateTimeKeepingStatus
     * @description: update timeKeeping status by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {timeKeeping} timeKeeping object want to update
     * @return: {result} callback
     */
    static updateTimeKeepingStatus = (result, lstTimeKeeping) => {
        let lstSql = "";
        lstTimeKeeping.forEach((timeKeeping) => {
            lstSql += `UPDATE timeKeeping SET isCheck = '${timeKeeping.isCheck}' WHERE id = ${timeKeeping.id};`;
        });
        ModelDAO.updateObjectByIdWithSqlList(lstSql, result);
    };

    /**
     * @name: reportTimeKeeping
     * @description: report timeKeeping all team and each team
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static reportTimeKeeping = (result) => {
        let sql = `SELECT s.teamId, t.teamName, tk.isCheck FROM staff AS s
                   INNER JOIN timekeeping AS tk
                   ON s.id = tk.staffId
                   INNER JOIN daily AS d
                   ON d.id = tk.dailyId
                   INNER JOIN team AS t
                   ON t.id = s.teamId
                   WHERE d.workDate = CURRENT_DATE()
                   ORDER BY s.teamId`;
        ModelDAO.getDataListWithSql(TimeKeepingDAO.convertObject, sql, result);
    };

    /**
     * @name: convertObject
     * @description: convert raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/10
     * @param: {obj} object want to convert
     * @return: {obj} object after convert
     */
    static convertObject = (obj) => {
        return {
            id: obj.id,
            dailyId: obj.dailyId,
            staffId: obj.staffId,
            staffName: obj.staffName,
            phone: obj.phone,
            isCheck: obj.isCheck,
            description: obj.description,
            teamId: obj.teamId,
            teamName: obj.teamName,
        };
    };
}

module.exports = TimeKeepingDAO;
