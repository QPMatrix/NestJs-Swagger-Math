'use strict';

// Import necessary modules for JWT verification and environment management
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

// Extract the JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET;

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
            const decoded = jwt.verify(token, secretKey);
            // Attach the decoded user data to the request object for future use
            req.user = decoded;
            return true; // Authorization succeeded
        } catch (err) {
            // If the token is invalid or expired, throw an error
            throw new Error('Invalid or expired token');
        }
    },
};

module.exports = securityHandlers;
