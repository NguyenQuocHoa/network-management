const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const apiHost = express();
const adminHost = express();
const staffHost = express();
const fs = require("fs");
const vhost = require("vhost");
const https = require("https");

const mainApp = express();

const corsOptions = {
    origin: ["https://www.admin.com", "https://www.binoad.com.vn"],
};

// ====================================== CONFIG VIRTUAL HOSTS ====================================== //
adminHost.use(express.static(path.join(__dirname, './www/public/views')));
mainApp.use(vhost('www.admin.com', adminHost));
staffHost.use(express.static(path.join(__dirname, './www/public/views2')));
mainApp.use(vhost('www.binoad.com.vn', staffHost));
mainApp.use(vhost('www.api.binoad.com', apiHost));
// ====================================== CONFIG VIRTUAL HOSTS ====================================== //

// ====================================== HOST 1 START ====================================== //
const PORT = 443;

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
apiHost.use(bodyParser.json());
apiHost.use(bodyParser.urlencoded({ extended: true }));

apiHost.use(cors(corsOptions));

apiHost.use(Logger.loggerRequestMiddleware);
apiHost.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

apiHost.use("/api/accounts", accountRoute);
apiHost.use("/api/teams", teamRoute);
apiHost.use("/api/staffs", staffRoute);
apiHost.use("/api/monthlies", monthlyRoute);
apiHost.use("/api/monthlies", dailyRoute);
apiHost.use("/api/timeKeepings", timeKeepingRoute);

const sslServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, mainApp);

sslServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});