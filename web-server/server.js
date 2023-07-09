const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const host = express();
const host2 = express();
const fs = require("fs");
const vhost = require("vhost");

const corsOptions = {
    origin: ["http://localhost:8000"],
};

// ====================================== CONFIG VIRTUAL HOSTS ====================================== //
var virtualHosts = JSON.parse(fs.readFileSync("vhosts.json", "utf8"));
console.table(virtualHosts);
virtualHosts.forEach(function (virtualHost) {
    var virtualHostApp = express();
    console.log(path.join(__dirname, virtualHost.path));
    virtualHostApp.use(express.static(path.join(__dirname, virtualHost.path)));
    host.use(vhost(virtualHost.domain, virtualHostApp));
});
// ====================================== CONFIG VIRTUAL HOSTS ====================================== //

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
} = require("../express-backend-1/routes/index.route");
host.use(bodyParser.json());
host.use(bodyParser.urlencoded({ extended: true }));

host.use(cors(corsOptions));

host.use(Logger.loggerRequestMiddleware);
// host.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

host.use("/api/accounts", accountRoute);
host.use("/api/teams", teamRoute);
host.use("/api/staffs", staffRoute);
host.use("/api/monthlies", monthlyRoute);
host.use("/api/monthlies", dailyRoute);

host.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
// ======================================= HOST 1 END ======================================= //

// ====================================== HOST 2 START ====================================== //
// const PORT2 = 8082;

// const Logger2 = require("../express-backend-2/middlewares/logger.middleware");
// // const Jwt = require("./middlewares/jwt.middleware");

// const userRoute2 = require("../express-backend-2/routes/user.route");
// const accountRoute2 = require("../express-backend-2/routes/account.route");
// const notifyRoute2 = require("../express-backend-2/routes/notify.route");

// host2.use(bodyParser.json());
// host2.use(bodyParser.urlencoded({ extended: true }));

// host2.use(express.static("public"));
// host2.use(cors(corsOptions));

// host2.use(Logger2.loggerRequestMiddleware);
// host2.use(Logger2.loggerErrorMiddleware);
// // host2.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

// host2.use("/users", userRoute2);
// host2.use("/api/accounts", accountRoute2);
// host2.use("/api/notifies", notifyRoute2);

// host2.listen(PORT2, () => {
//   console.log(`listening on port ${PORT2}`);
// });
// ======================================= HOST 2 END ======================================= //
