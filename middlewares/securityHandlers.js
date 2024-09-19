'use strict';

// Import necessary modules for JWT verification and environment management
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');
// Extract the JWT secret key from environment variables


// Define the custom security handler for bearer authentication (JWT token validation)
const securityHandlers = {
    // This function handles JWT validation for routes requiring bearerAuth
    bearerAuth: async (req, scopes, schema) => {
        // Extract the Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            // If the Authorization header is missing, throw an error
            throw new Error('Authorization header required');
        }

        // Split the header to extract the token (Bearer <token>)
        const token = authHeader.split(' ')[1];
        if (!token) {
            // If the token is missing, throw an error
            throw new Error('Token missing');
        }

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, jwtSecret);
            // Attach the decoded user data to the request object for future use
            req.user = decoded;
            return true; // Authorization succeeded
        } catch (error) {
            // If the token is invalid or expired, throw an error
            const err =  new Error('Invalid or expired token');
            err.status=403;
            throw err
        }
    },
};

module.exports = securityHandlers;
