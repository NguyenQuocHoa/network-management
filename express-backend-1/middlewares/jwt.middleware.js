const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

/**
 * @name: class Jwt
 * @description: include all function verify jwt
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/18
 */

class Jwt {
    /**
     * @name: verifyRequestMiddleware
     * @description: check permission all request
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {req} request
     * @param: {res} response
     * @param: {next} callback function
     * @return: {next} to next middleware
     */
    static verifyRequestMiddleware = (req, res, next) => {
        if (req.path === "/api/accounts/login" && req.method === "POST") {
            next();
            return;
        }
        jwt.verify(req.token, CONFIG.SECRET_KEY, (err) => {
            if (err) {
                res.sendStatus(401);
            } else {
                next();
            }
        });
    };

    /**
     * @name: verifyToken
     * @description:  check bearer token all request
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {req} request
     * @param: {res} response
     * @param: {next} callback function
     * @return: {next} to next middleware
     */
    static verifyToken = (req, res, next) => {
        if (req.path === "/api/accounts/login" && req.method === "POST") {
            next();
            return;
        }
        const bearHeader = req.headers["authorization"];
        if (typeof bearHeader !== "undefined") {
            const bearer = bearHeader.split(" ");
            req.token = bearer[1];
            next();
        } else {
            res.sendStatus(401);
        }
    };
}

module.exports = Jwt;
