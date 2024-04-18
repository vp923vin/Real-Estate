const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Property = require("../../../Models/PropertyModel");
const Exclusive = require("../../../Models/ExclusiveModel");
const { baseUri, port } = require("../../../Config/config");

const fetchPropertyDetails = async (req, res) => {
  try {
    const apiUrl = `${baseUri}:${port}/api/admin/dummy-properties`;
    // const apiUrl = ``;
    const response = await axios.get(apiUrl);
    const propertiesData = response.data;
    // here code is not completed

    return res.status(200).json({
      status: true,
      message: "Properties details saved successfully",
    });
  } catch (error) {
    console.error("Error in submitting property details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      status: true,
      message: "Properties data gets successfully",
      data: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const getPropertyWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find().skip(skip).limit(limit);

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchProperties = async (req, res) => {
  try {
    const { location } = req.query;

    const filterQuery = {
      $or: [
        { address: { $regex: location, $options: "i" } },
        { mls_number: { $regex: location, $options: "i" } },
      ],
    };

    const properties = await Property.find(filterQuery);

    return res.status(200).json({
      status: true,
      message: "Filtered successfully",
      data: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// const filterProperties = async (req, res) => {
//   try {
//     const filters = req.query;
//     const filterCriteria = {};
//     for (const [key, value] of Object.entries(filters)) {
//       filterCriteria[key] = { $regex: value, $options: "i" };
//     }
//     const properties = await Property.find(filterCriteria);
//     return res.status(200).json({
//       status: true,
//       message: "filtered successfully",
//       data: properties,
//     });
//     // res.json(properties);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const filterProperties = async (req, res) => {
  try {
    const filters = req.query;
    const filterCriteria = {};
    
    // Iterate through the filters and construct the filter criteria object
    for (const [key, value] of Object.entries(filters)) {
      // Apply different filter conditions based on the filter key
      switch(key) {
        case 'location':
          // For location, search in both the address and mls_number fields
          filterCriteria.$or = [
            { "address": { $regex: value, $options: "i" } },
            { "mls_number": { $regex: value, $options: "i" } }
          ];
          break;

        case 'priceRange':
          // Handle price range filter
          // Assuming value is a string in the format "min-max"
          const [minPrice, maxPrice] = value.split('-');
          filterCriteria["price"] = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
          break;
        case 'beds':
          // Handle beds filter
          filterCriteria["bedrooms"] = { $gte: parseInt(value) };
          break;
        case 'baths':
          // Handle baths filter
          filterCriteria["bathrooms"] = { $gte: parseInt(value) };
          break;
        case 'buildingStyle':
          // Handle building style filter
          filterCriteria["additional_details.Building_Type"] = { $regex: value, $options: "i" };
          break;
        case 'squareFeet':
          // Handle square feet filter
          filterCriteria["area"] = { $gte: parseInt(value) };
          break;
        // Add more cases for other filter criteria as needed
        default:
          // Handle unknown filter keys
          break;
      }
    }
    
    // Query properties based on the constructed filter criteria
    const properties = await Property.find(filterCriteria);
    
    return res.status(200).json({
      status: true,
      message: "Filtered successfully",
      data: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProperty = await Property.findByIdAndDelete(id);
    if (!deleteProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Property:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const get_property_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const propertiesData = await Property.find({ _id: id });

    return res.status(200).json(propertiesData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Exclusive Listing
const get_exclusive_listing = async (req, res) => {
  try {
    const ExclusiveData = await Exclusive.find();
    console.log(ExclusiveData);
    return res.status(200).json({
      status: true,
      message: "filtered successfully",
      data: ExclusiveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const get_exclusive_listing_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const ExclusiveData = await Exclusive.find({ _id: id });
    return res.status(200).json(ExclusiveData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const post_exclusive_listing = async (req, res) => {
  try {
    const {
      exclusive_price,
      exclusive_address,
      exclusive_bedroom,
      exclusive_bathroom,
      exclusive_area,
    } = req.body;

    console.log(req.body);

    // Get the filename of the uploaded image
    const exclusive_image = req.file.filename;

    const newExclusive = new Exclusive({
      exclusive_image,
      exclusive_price,
      exclusive_address,
      exclusive_bedroom,
      exclusive_bathroom,
      exclusive_area,
    });

    const savedExclusive = await newExclusive.save();

    res.status(201).json({
      status: "success",
      message: "Exclusive property saved successfully",
      data: savedExclusive,
    });
  } catch (error) {
    console.error("Error uploading exclusive property:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteExlusive = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExclusive = await Exclusive.findByIdAndDelete(id);
    if (!deleteExclusive) {
      return res.status(404).json({
        success: false,
        message: "Exclusive not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Exclusive deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Exclusive:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  fetchPropertyDetails,
  getAllProperties,
  getPropertyWithPagination,
  searchProperties,
  filterProperties,
  deleteProperty,
  get_property_by_id,
  get_exclusive_listing,
  get_exclusive_listing_by_id,
  post_exclusive_listing,
  deleteExlusive,
};
