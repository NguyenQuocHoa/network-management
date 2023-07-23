const express = require("express");
const path = require("path");
const host = express();
const host2 = express();
const fs = require("fs");
const vhost = require("vhost");

const https = require("https");
const mainApp = express();

// ====================================== CONFIG VIRTUAL HOSTS ====================================== //
host.use(express.static(path.join(__dirname, './www/public/views')));
mainApp.use(vhost('www.admin.com', host));
host2.use(express.static(path.join(__dirname, './www/public/views2')));
mainApp.use(vhost('www.binoad.com.vn', host2));
// ====================================== CONFIG VIRTUAL HOSTS ====================================== //

// ====================================== HOST 1 START ====================================== //
const PORT = 443;

const sslServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, mainApp);

sslServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});