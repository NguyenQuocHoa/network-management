const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const vhost = require("vhost");

const PORT = 8080;
const PATH_STATIC_RESOURCE_REACT = __dirname + "/views/";

const Logger = require("./middlewares/logger.middleware");
const Jwt = require("./middlewares/jwt.middleware");

const userRoute = require("./routes/user.route");
const accountRoute = require("./routes/account.route");
const notifyRoute = require("./routes/notify.route");

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

app.use("/users", userRoute);
app.use("/api/accounts", accountRoute);
app.use("/api/notifies", notifyRoute);

app.use(Logger.loggerErrorMiddleware);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
