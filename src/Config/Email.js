require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const gmail = process.env.GMAIL_USER_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmail,
        pass: process.env.GMAIL_USER_PASSWORD,
    },
});

module.exports = {
    transporter,
    gmail
};