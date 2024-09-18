'use strict';

// Import necessary modules for path resolution, HTTP server, environment variable management, and OpenAPI tools.
const path = require('path');
const http = require('http');
const dotenv = require('dotenv'); // To load environment variables from .env file
dotenv.config();
const oas3Tools = require('oas3-tools'); // OpenAPI tools for routing and middleware management
const securityHandlers = require('./middlewares/securityHandlers'); // Custom JWT security handlers

// Set the port to listen on, defaulting to 3000 if not set in environment variables
const serverPort = process.env.PORT || 3000;

// Configuration for swaggerRouter
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers'), // Path to your controllers
    },
    // Integrating OpenAPI Validator with security handlers for JWT validation
    openApiValidator: {
        apiSpec: path.join(__dirname, 'api/openapi.yaml'), // Path to the OpenAPI spec (YAML file)
        validateResponses: true, // Enable response validation based on the OpenAPI spec
        validateSecurity: {
            handlers: securityHandlers, // Use the custom JWT validation handlers
        },
    },
};

// Initialize the express app with OpenAPI validator and swagger configuration
const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Start the server only if not running in a test environment
if (process.env.NODE_ENV !== 'test') {
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
}

// Export the app for testing purposes
module.exports = app;
