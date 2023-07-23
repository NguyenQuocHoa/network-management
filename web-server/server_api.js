const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const host = express();
const host2 = express();
const fs = require("fs");
const vhost = require("vhost");
const https = require("https");

const corsOptions = {
    origin: ["https://www.admin.com", "https://www.binoad.com.vn"],
};

// ====================================== HOST 1 START ====================================== //
const PORT = 8080;

const Logger = require("../express-backend-1/middlewares/logger.middleware");
const Jwt = require("../express-backend-1/middlewares/jwt.middleware");

const {
    accountRoute,
    teamRoute,
    staffRoute,
    monthlyRoute,
    dailyRoute,
    timeKeepingRoute,
} = require("../express-backend-1/routes/index.route");
host.use(bodyParser.json());
host.use(bodyParser.urlencoded({ extended: true }));

host.use(cors(corsOptions));

host.use(Logger.loggerRequestMiddleware);
host.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

host.use("/api/accounts", accountRoute);
host.use("/api/teams", teamRoute);
host.use("/api/staffs", staffRoute);
host.use("/api/monthlies", monthlyRoute);
host.use("/api/monthlies", dailyRoute);
host.use("/api/timeKeepings", timeKeepingRoute);

const sslServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, host);

sslServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});