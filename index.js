global.mainDir = __dirname;
global.tempUp = {};

const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const config = require('./config.json');

const app = express();
const port = config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

require('./src/web/web-server').web(app);
require('./src/utils/remove-chunks');
require('./src/utils/file-check');

const routesPath = path.join(global.mainDir, 'src', 'routes');
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((file) => {
    const routePath = `/${file.replace('.js', '')}`;
    const route = require(path.join(routesPath, file));
    app.use(routePath, route);
});

app.all('*', (req, res) => {
    res.redirect(`/`);
});

app.listen(port, () => {
    console.log(`Temp-Up listening at http://localhost:${port}`);
});