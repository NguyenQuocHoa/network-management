const jwt = require("jsonwebtoken");
const CONFIG = require("../config");
const AccountDAO = require("../dao/account.dao");
const { loggerErrorMiddleware } = require("../middlewares/logger.middleware");

/**
 * @name: getAccounts
 * @description: get all account by key word
 * @author: Hoa Nguyen Quoc
 * @created : 2022/06/16
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getAccounts = (req, res, next) => {
    let kw = req.query.kw;
    AccountDAO.getAccounts((err, accounts) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.send(accounts);
    }, kw);
};

/**
 * @name: getAccountById
 * @description: get account by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/06/16
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getAccountById = (req, res, next) => {
    let accountId = req.params.id;
    AccountDAO.getAccountById((err, account) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!account) {
            loggerErrorMiddleware(generateMsgNotFound(accountId), req, res, next);
            return;
        }
        return res.send(account);
    }, accountId);
};

/**
 * @name: getAccountByUsername
 * @description: get account by username
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/19
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.getAccountByUsername = (req, res, next) => {
    const { username, password } = req.body;
    AccountDAO.getAccountByUsername(
        (err, account) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!account) {
                const errSystem = {
                    controllerName: "Account controller",
                    message: `Not found object have username ${username}`,
                };
                loggerErrorMiddleware(errSystem, req, res, next);
                return;
            }

            jwt.sign({ account }, CONFIG.SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
                res.send({ token, teamId: account.teamId });
            });
            return;
        },
        username,
        password
    );
};

/**
 * @name: insertAccount
 * @description: insert account
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.insertAccount = (req, res, next) => {
    let accountPayload = AccountDAO.convertObject(req.body);
    AccountDAO.insertAccount((err, insertId) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!insertId) {
            loggerErrorMiddleware(generateMsgNotFound(accountId), req, res, next);
            return;
        }
        return res.send({ accountId: insertId });
    }, accountPayload);
};

/**
 * @name: updateAccountById
 * @description: update account by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateAccountById = (req, res, next) => {
    let accountId = req.params.id;
    let accountPayload = AccountDAO.convertObject(req.body);
    AccountDAO.updateAccountById(
        (err, affectedRows) => {
            if (err) {
                loggerErrorMiddleware(generateMsgErr(err), req, res, next);
                return;
            }
            if (!affectedRows) {
                loggerErrorMiddleware(generateMsgNotFound(accountId), req, res, next);
                return;
            }
            return res.status(201).send(accountId);
        },
        accountId,
        accountPayload
    );
};

/**
 * @name: updateAccountStatus
 * @description: update account status by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.updateAccountStatus = (req, res, next) => {
    let lstAccount = req.body?.lstAccount?.map((account) => AccountDAO.convertObject(account));
    AccountDAO.updateAccountStatus((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        return res.status(200).send();
    }, lstAccount);
};

/**
 * @name: deleteAccountById
 * @description: delete account by id
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/09
 * @param: {req} request
 * @param: {res} response
 * @param: {next} callback function
 * @return: {res} response
 * @return: {next} callback function if have error
 */
exports.deleteAccountById = (req, res, next) => {
    let accountId = req.params.id;
    AccountDAO.deleteAccountById((err, affectedRows) => {
        if (err) {
            loggerErrorMiddleware(generateMsgErr(err), req, res, next);
            return;
        }
        if (!affectedRows) {
            loggerErrorMiddleware(generateMsgNotFound(accountId), req, res, next);
            return;
        }
        return res.status(200).send();
    }, accountId);
};

const generateMsgErr = (err) => {
    return {
        controllerName: "Account controller",
        message: err,
    };
};

const generateMsgNotFound = (accountId) => {
    return {
        controllerName: "Account controller",
        message: `Not found object have id ${accountId}`,
    };
};
