const jwt = require("jsonwebtoken");
const CONFIG = require("../config");
const AccountDAO = require("../dao/account.dao");

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
            next({
                controllerName: "Account controller",
                message: err,
            });
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
            next({
                controllerName: "Account controller",
                message: err,
            });
            return;
        }
        if (!account) {
            next({
                controllerName: "Account controller",
                message: `Not found object have id ${accountId}`,
            });
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
                next({
                    controllerName: "Account controller",
                    message: err,
                });
                return;
            }
            if (!account) {
                next({
                    controllerName: "Account controller",
                    message: `Not found object have username ${username}`,
                });
                return;
            }
            if (!account) {
                res.sendStatus(404);
                return;
            }

            jwt.sign({ account }, CONFIG.SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
                res.send({ token });
            });
            return;
        },
        username,
        password
    );
};
