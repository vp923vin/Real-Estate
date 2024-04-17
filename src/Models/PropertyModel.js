const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    price: String,
    address: String,
    bedrooms: String,
    bathrooms: String,
    office_name: String,
    realtor_images: [String],
    main_image: String,
    image_urls: [String],
    url: String,
    mls_number: String,
    area: String,
    description: String,
    created_at: Date,
    directions_link: String,
    additional_details: {
        Property_Type: String,
        Building_Type: String,
        Storeys: String,
        Square_Footage: String,
        Title: String,
        Age_Of_Building: String,
        Annual_Property_Taxes: String,
        Parking_Type: String,
        Time_on_REALTOR_ca: String,
        Total: String,
        Appliances_Included: String,
        Fixtures_Included: String,
        Basement_Type: String,
        Style: String,
        Architecture_Style: String,
        Fire_Protection: String,
        Building_Amenities: String,
        Storage: String,
        Fireplace: String,
        Heating_Type: String,
        Utility_Type: String,
        Water: String,
        Community_Features: String,
        Maintenance_Fees: String,
        Total_Parking_Spaces: String
    },
    room_details: [],
    timestamp: Date
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
