const TeamDAO = require("../dao/team.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getTeams
 * @description: get all team by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getTeams = (req, res, next) => {
    let kw = req.query.kw;
    TeamDAO.getTeams((err, teams) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(teams);
    }, kw);
};

/**
 * @name: getTeamById
 * @description: get team by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getTeamById = (req, res, next) => {
    let teamId = req.params.id;
    TeamDAO.getTeamById((err, team) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!team) {
            loggerErrorMiddleware(generateMsgNotFound(teamId), req, res, next);
            return;
        }
        return res.send(team);
    }, teamId);
};

/**
 * @name: insertTeam
 * @description: insert team
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.insertTeam = (req, res, next) => {
    let teamPayload = TeamDAO.convertObject(req.body);
    TeamDAO.insertTeam((err, insertId) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!insertId) {
            loggerErrorMiddleware(generateMsgNotFound(teamId), req, res, next);
            return;
        }
        return res.status(201).send({ teamId: insertId });
    }, teamPayload);
};

/**
 * @name: updateTeamById
 * @description: update team by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateTeamById = (req, res, next) => {
    let teamId = req.params.id;
    let teamPayload = TeamDAO.convertObject(req.body);
    TeamDAO.updateTeamById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(teamId), req, res, next);
                return;
            }
            return res.status(200).send();
        },
        teamId,
        teamPayload
    );
};

/**
 * @name: updateTeamStatus
 * @description: update team status by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateTeamStatus = (req, res, next) => {
    let lstTeam = req.body?.lstTeam?.map((team) => TeamDAO.convertObject(team));
    TeamDAO.updateTeamStatus((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.status(200).send();
    }, lstTeam);
};

/**
 * @name: deleteTeamById
 * @description: delete team by id
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.deleteTeamById = (req, res, next) => {
    let teamId = req.params.id;
    TeamDAO.deleteTeamById((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!affectedRows) {
            loggerErrorMiddleware(generateMsgNotFound(teamId), req, res, next);
            return;
        }
        return res.status(200).send();
    }, teamId);
};

const generateMsgErr = (err) => {
    return {
        controllerName: "Team controller",
        message: err,
    };
};

const generateMsgNotFound = (teamId) => {
    return {
        controllerName: "Team controller",
        message: `Not found object have id ${teamId}`,
    };
};
