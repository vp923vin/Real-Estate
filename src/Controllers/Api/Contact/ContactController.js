require("dotenv").config();
const Contact = require("../../../Models/ContactModel");
const { sendEmails } = require("../../../../src/Utils/sendEmail");

const contactUserDetails = async (req, res) => {
  try {
    const { name, email, phone, subject, description } = req.body;
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      description,
    });

    const data = await newContact.save();

    const payload = {
      email: process.env.ADMIN_EMAIL, // admin email address
      subject: `${name} is contacting you`,
      userData: newContact,
    };
    const mailConfirm = await sendEmails(payload, `testEmail.ejs`);
    if (mailConfirm) {
      return res.status(201).json({
        status: true,
        message: "Contact details submitted successfully",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Unable to Contact",
      });
    }

    // res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error in submitting contact details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({
      status: true,
      message: "All contact details retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteMultipleContacts = async (req, res) => {
  try {
    const { ids } = req.body;
    await Contact.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      status: true,
      message: "Contacts deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const contactUserByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }
    const payload = {
      email: contact.email,
      subject: "Confirmation Email",
      userData: contact,
    };
    const mailConfirm = await sendEmails(payload, `testEmail.ejs`);
    if (mailConfirm) {
      return res.status(200).json({
        status: true,
        message: "Email successfully sent to user.",
        data: contact,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "unable to send email",
      });
    }
  } catch (error) {
    console.error("Error fetching contact by email:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  contactUserDetails,
  getAllContacts,
  deleteContactById,
  deleteMultipleContacts,
  contactUserByEmail,
};
