const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    address: {
        type: 'string',
        default: 'null',
    },
    phoneNumber1: {
        type: 'string',
        default: 'null',
    },
    phoneNumber2: {
        type: 'string',
        default: 'null',
    },
    whatsapp: {
        type: 'string',
        default: 'null',
    },
    email1: {
        type: 'string',
        default: 'null',
    },
    email2: {
        type: 'string',
        default: 'null',
    },
    facebook: {
        type: 'string',
        default: 'null',
    },
    twitter: {
        type: 'string',
        default: 'null',
    },
    linkedin: {
        type: 'string',
        default: 'null',
    },
    instagram: {
        type: 'string',
        default: 'null',
    },
    tiktok: {
        type: 'string',
        default: 'null',
    },
    youtube: {
        type: 'string',
        default: 'null',
    }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
