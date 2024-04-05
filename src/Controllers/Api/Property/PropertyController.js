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
    const { query } = req.query;
    const properties = await Property.find({
      $or: [
        { "listing-item-entry-title": { $regex: query, $options: "i" } },
        { "alt-addr": { $regex: query, $options: "i" } },
        { "alt-subarea": { $regex: query, $options: "i" } },
        {
          "mrp-listing-attribution-container": { $regex: query, $options: "i" },
        },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "filtered successfully",
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

const filterProperties = async (req, res) => {
  try {
    const filters = req.query;
    const filterCriteria = {};
    for (const [key, value] of Object.entries(filters)) {
      filterCriteria[key] = { $regex: value, $options: "i" };
    }
    const properties = await Property.find(filterCriteria);
    return res.status(200).json({
      status: true,
      message: "filtered successfully",
      data: properties,
    });
    // res.json(properties);
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
