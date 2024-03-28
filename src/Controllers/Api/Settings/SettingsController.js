const Settings = require('../../../Models/SettingsModel');

const addSettings = async (req, res) => {
    try {
        const {
            address,
            phoneNumber1,
            phoneNumber2,
            whatsapp,
            email1,
            email2,
            facebook,
            twitter,
            linkedin,
            instagram,
            tiktok,
            youtube
        } = req.body;

        const settingsData = new Settings({
            address,
            phoneNumber1,
            phoneNumber2,
            whatsapp,
            email1,
            email2,
            facebook,
            twitter,
            linkedin,
            instagram,
            tiktok,
            youtube
        });

        const savedSettings = await settingsData.save();
        return res.status(201).json({ 
            status: true,
            message: "Settings added successfully", 
            data: savedSettings 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


const updateSettingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            address,
            phoneNumber1,
            phoneNumber2,
            whatsapp,
            email1,
            email2,
            facebook,
            twitter,
            linkedin,
            instagram,
            tiktok,
            youtube
        } = req.body;

        const updatedSettings = await Settings.findByIdAndUpdate(id, {
            address,
            phoneNumber1,
            phoneNumber2,
            whatsapp,
            email1,
            email2,
            facebook,
            twitter,
            linkedin,
            instagram,
            tiktok,
            youtube
        }, { new: true });

        if (!updatedSettings) {
            return res.status(404).json({ 
                status: false,
                message: "Settings not found"
            });
        }

        return res.status(200).json({ 
            status: true,
            message: "Settings updated successfully", 
            data: updatedSettings 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


const getSettingsById = async (req, res) => {
    try {
        const { id } = req.params;

        const settings = await Settings.findById(id);

        if (!settings) {
            return res.status(404).json({ 
                status: false, 
                message: "Settings not found" 
            });
        }

        return res.status(200).json({ 
            status: true,
            message: "Settings updated successfully", 
            data: settings 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


module.exports = {
    addSettings,
    updateSettingsById,
    getSettingsById
}