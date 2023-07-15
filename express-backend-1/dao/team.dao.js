const ModelDAO = require("./model.dao");
const connection = require("../mysql");

/**
 * @name: class Team
 * @description: dao for model team
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 */
class TeamDAO {
    /**
     * @name: getTeams
     * @description: get list team from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getTeams = (result, kw = null) => {
        ModelDAO.getDataList("team", null, TeamDAO.convertObject, result, kw);
    };

    /**
     * @name: getTeamById
     * @description: get team by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {teamId} id of object want to get
     * @return: {result} callback
     */
    static getTeamById = (result, teamId) => {
        ModelDAO.getObjectById("team", TeamDAO.convertObject, result, teamId);
    };

    /**
     * @name: insertTeam
     * @description: insert team by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {team} team object want to insert
     * @return: {result} callback
     */
    static insertTeam = (result, team) => {
        let sql = `INSERT INTO team (teamName, leaderId, description, isActive, isDelete)
                    VALUES ('${team.teamName}', '${team.leaderId}', '${
            team.description ?? `${team.description}`
        }', ${team.isActive}, 0);`;
        ModelDAO.insertObjectWithSql(sql, result);
    };

    /**
     * @name: updateTeamById
     * @description: update team by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {team} team object want to update
     * @return: {result} callback
     */
    static updateTeamById = (result, teamId, team) => {
        let sql = `UPDATE team SET teamName = '${team.teamName}', leaderId = ${team.leaderId}, 
        description = '${team.description}', isActive = ${team.isActive} WHERE id = ${teamId}`;
        ModelDAO.updateObjectByIdWithSql(sql, result);
    };

    /**
     * @name: deleteTeamById
     * @description: delete team by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {team} team object want to delete
     * @return: {result} callback
     */
    static deleteTeamById = (result, teamId) => {
        let sql = `UPDATE team SET isDelete = 1 WHERE id = ${teamId}`;
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
            teamName: obj.teamName,
            leaderId: obj.leaderId,
            description: obj.description,
            isActive: obj.isActive,
        };
    };
}

module.exports = TeamDAO;
