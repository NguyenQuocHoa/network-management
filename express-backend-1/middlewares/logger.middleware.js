const fs = require("fs");
const CONFIG = require("../config");

/**
 * @name: class Logger
 * @description: include all function for logger
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 */
class Logger {
    /**
     * @name: loggerRequestMiddleware
     * @description: log info of all request to server
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {req} request
     * @param: {res} response
     * @param: {next} callback function
     * @return: {next} to next middleware
     */
    static loggerRequestMiddleware = (req, res, next) => {
        let ips = (
            req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            ""
        ).split(",");
        let ip = ips[0].trim();
        let currentDateTime = new Date();
        let formattedDate =
            currentDateTime.getFullYear() +
            "-" +
            String(currentDateTime.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(currentDateTime.getDate()).padStart(2, "0") +
            " " +
            String(currentDateTime.getHours()).padStart(2, "0") +
            ":" +
            String(currentDateTime.getMinutes()).padStart(2, "0") +
            ":" +
            String(currentDateTime.getSeconds()).padStart(2, "0");
        let method = req.method;
        let url = req.url;
        let status = res.statusCode;
        let log = `[${formattedDate}] - [${ip}] - ${method}:${url} ${status}`;
        fs.appendFile(`${CONFIG.PATH_LOG}/request_logs.txt`, log + "\n", (err) => {
            if (err) {
                console.log(err);
            }
        });
        next();
    };

    /**
     * @name: loggerErrorMiddleware
     * @description: log info of all error
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {req} request
     * @param: {res} response
     * @param: {next} callback function
     * @return: {res} response
     */
    static loggerErrorMiddleware = (err, req, res, next) => {
        let currentDateTime = new Date();
        let formattedDate =
            currentDateTime.getFullYear() +
            "-" +
            String(currentDateTime.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(currentDateTime.getDate()).padStart(2, "0") +
            " " +
            String(currentDateTime.getHours()).padStart(2, "0") +
            ":" +
            String(currentDateTime.getMinutes()).padStart(2, "0") +
            ":" +
            String(currentDateTime.getSeconds()).padStart(2, "0");
        let log;
        if (err.controllerName) {
            log = `[${formattedDate}]-[${err.controllerName}]: ${err.message}`;
        } else {
            log = `[${formattedDate}]: ${err.stack}`;
        }
        fs.appendFile(`${CONFIG.PATH_LOG}/error_logs.txt`, log + "\n", (err) => {
            if (err) {
                console.log("error_logs", err);
            }
        });
        if (log.includes("Not found")) {
            return res.status(404).send({
                error: err,
            });
        } else {
            return res.status(500).send({ error: err });
        }
    };
}

module.exports = Logger;
