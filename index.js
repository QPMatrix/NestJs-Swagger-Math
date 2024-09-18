'use strict';

const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const oas3Tools = require('oas3-tools');
const serverPort = process.env.PORT || 3000;

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

if (process.env.NODE_ENV !== 'test') {
    // Only start the server if not in test mode
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
}

// Export the app for testing
module.exports = app;
