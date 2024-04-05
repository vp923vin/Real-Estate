const mongoose = require("mongoose");

const ExclusiveSchema = new mongoose.Schema({
  exclusive_image: { type: String },
  exclusive_price: { type: String },
  exclusive_address: { type: String },
  exclusive_bedroom: { type: String },
  exclusive_bathroom: { type: String },
  exclusive_area: { type: String },
});

const Exclusive = mongoose.model("Exclusive", ExclusiveSchema);

module.exports = Exclusive;
