const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 8090;
const PATH_STATIC_RESOURCE_REACT = __dirname + "/views/";

const Logger = require("./middlewares/logger.middleware");
const Jwt = require("./middlewares/jwt.middleware");

const accountRoute = require("./routes/account.route");
const teamRoute = require("./routes/team.route");
const staffRoute = require("./routes/staff.route");
const monthlyRoute = require("./routes/monthly.route");

const corsOptions = {
    origin: "http://localhost:8000",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(PATH_STATIC_RESOURCE_REACT));
app.use(cors(corsOptions));

app.use(Logger.loggerRequestMiddleware);
// app.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

app.use("/api/accounts", accountRoute);
app.use("/api/teams", teamRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/monthlies", monthlyRoute);
app.use("/api/dailys", monthlyRoute);

app.use(Logger.loggerErrorMiddleware);

app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
});
