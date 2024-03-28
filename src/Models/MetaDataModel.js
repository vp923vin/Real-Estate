const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define MetaData schema
const metaDataSchema = new Schema({
    pageName: {
        type: 'string',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    }
});

// Create MetaData model
const MetaData = mongoose.model('MetaData', metaDataSchema);

module.exports = MetaData;
