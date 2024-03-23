require('dotenv').config();
const baseUri = process.env.APP_BASE_URL;
const port = process.env.APP_PORT;
const appName = process.env.APP_NAME;
const dbUri = process.env.DB_URI;
const jwtSK = process.env.JWT_SECRET_KEY;
const smtpMail = process.env.GMAIL_USER_EMAIL;
const smtpPassword = process.env.GMAIL_USER_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;

module.exports = {
    baseUri, 
    appName,
    dbUri,
    jwtSK,
    smtpMail,
    smtpPassword,
    adminEmail,
    port
}