const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    // _id: String,
    URL: String,
    "listing-item-entry-title": String,
    "alt-addr": String,
    "alt-subarea": String,
    "alt-postal-code": String,
    date: Date,
    desc: String,
    "mrp-listing-main-image-src": String,
    "mrp-listing-address-info-href": String,
    "mrp-listing-price-container": String,
    "summary-property-type": String,
    "floor-area-line": String,
    "mrp-i-unit": String,
    "mrp-m-unit": String,
    inner: String,
    "mrp-listing-attribution-container": String,
    "Status:": String,
    "MLS® Num:": String,
    "Bedrooms:": String,
    "Bathrooms:": String,
    "Floor Area:": String,
    image_urls: [String],
    description: String,
    property_info: {
        "info-section-REA-4": {
            "Property Type:": String,
            "Dwelling Type:": String,
            "Home Style:": String,
            "Year built:": String,
            "Total area:": String,
            "Total Floor Area:": String,
            "Total unfinished area:": String,
            "Main Floor Area:": String,
            "Floor Area Above Main:": String,
            "Floor Area Above Main 2:": String,
            "Floor Area Below Main:": String,
            "Basement Area:": String,
            "No. Floor Levels:": String,
            "Bedrooms:": String,
            "Bathrooms:": String,
            "Kitchens:": String,
            "Rooms:": String,
            "Taxes:": String,
            "Lot Area:": String,
            "Lot Frontage:": String,
            "Outdoor Area:": String,
            "Water Supply:": String,
            "Plan:": String
        },
        "info-section-REA-5": {
            "Heating:": String,
            "Construction:": String,
            "Foundation:": String,
            "Basement:": String,
            "Roof:": String,
            "Fireplaces:": String,
            "Parking:": String,
            "Parking Total/Covered:": String,
            "Exterior Finish:": String,
            "Title to Land:": String,
            "Flood Plain:": String,
            "Suite:": String
        },
        "info-section-REA-7": {
            "Property Disclosure:": String,
            "Fixtures Leased:": String,
            "Fixtures Removed:": String,
            "Services Connected:": String
        },
        "info-section-REA-8": {
            "Original Price:": String
        }
    },
    bathroom_details: {
        Floor: String,
        Ensuite: String,
        Pieces: String,
        Other: String
    },
    additional_info: {
        ByLawRestrictions: String,
        RestrictedAge: String,
        MaintFees: String,
        MaintFeesInclude: String,
        FeaturesIncluded: String,
        SiteInfluences: String,
        Amenities: String,
        LegalDescription: String
    }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
