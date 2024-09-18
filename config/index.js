const dotenv = require('dotenv');
dotenv.config()
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    port: process.env.PORT || 3000
}