const MetaData = require('../../../Models/MetaDataModel');

const addSampleMetaData = async (req, res) => {
    try {
        const sampleData = [
            {
                pageName: 'test-1',
                title: "Sample Meta Title 1",
                description: "This is a sample meta description 1.",
                keywords: ["sample", "meta", "keywords"]
            },
            {
                pageName: 'test-2',
                title: "Sample Meta Title 2",
                description: "This is a sample meta description 2.",
                keywords: ["sample", "meta", "keywords"]
            },
            {
                pageName: 'test-3',
                title: "Sample Meta Title 3",
                description: "This is a sample meta description 3.",
                keywords: ["sample", "meta", "keywords"]
            },
            {
                pageName: 'test-4',
                title: "Sample Meta Title 4",
                description: "This is a sample meta description 4.",
                keywords: ["sample", "meta", "keywords"]
            },
            {
                pageName: 'test-5',
                title: "Sample Meta Title 5",
                description: "This is a sample meta description 5.",
                keywords: ["sample", "meta", "keywords"]
            },
            {
                pageName: 'test-6',
                title: "Sample Meta Title 6",
                description: "This is a sample meta description 6.",
                keywords: ["sample", "meta", "keywords"]
            }
        ];

        const insertedData = await MetaData.insertMany(sampleData);
        
        return res.status(200).json({ 
            status: true,
            message: "Sample data added successfully", 
            data: insertedData 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const updateMetaDataById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, keywords } = req.body; 

        const updatedMetaData = await MetaData.findByIdAndUpdate(id, { title, description, keywords }, { new: true });

        if (!updatedMetaData) {
            return res.status(404).json({ 
                status: false,
                message: "MetaData not found" 
            });
        }

        return res.status(200).json({ 
            status: true,
            message: "MetaData updated successfully", 
            data: updatedMetaData 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const getMetaDataById = async (req, res) => {
    try {
        const { pageName } = req.params; 
        const MetaData = await MetaData.find({ pageName });

        if (!MetaData) {
            return res.status(404).json({ 
                status: false,
                message: "MetaData not found" 
            });
        }

        return res.status(200).json({ 
            status: true,
            message: "MetaData get successfully", 
            data: MetaData 
        });
    } catch (error) {
        console.error("Error in submitting contact details:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const fetchAllMetaData = async (req, res) => {
    try {
        const allMetaData = await MetaData.find();

        return res.status(200).json({ 
            status: true,
            message: "All MetaData get successfully", 
            data: allMetaData 
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
    addSampleMetaData,
    updateMetaDataById,
    getMetaDataById,
    fetchAllMetaData
}