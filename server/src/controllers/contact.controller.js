const prisma = require("../utils/prisma");
const { sendContactEmail } = require("../services/email.service");

const createContact = async (req, res) => {

    try {

        const {

            fullName,
            email,
            company,
            service,
            budget,
            message

        } = req.body;

        const contact = await prisma.contact.create({

            data: {

                fullName,
                email,
                company,
                service,
                budget,
                message

            }

        });

        await sendContactEmail(contact);

        return res.status(201).json({

            success: true,

            message: "Inquiry submitted successfully.",

            data: contact

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Something went wrong."

        });

    }

};

const getAllContacts = async (req, res) => {

    try {

        const contacts = await prisma.contact.findMany({

            orderBy: {

                createdAt: "desc"

            }

        });

        return res.status(200).json({

            success: true,

            count: contacts.length,

            data: contacts

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch contacts."

        });

    }

};

const updateStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const contact = await prisma.contact.update({

            where: {

                id

            },

            data: {

                status

            }

        });

        return res.json({

            success: true,

            data: contact

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to update status."

        });

    }

};

const deleteContact = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.contact.delete({

            where: {
                id
            }

        });

        return res.json({

            success: true,

            message: "Inquiry deleted successfully."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to delete inquiry."

        });

    }

};

module.exports = {

    createContact,

    getAllContacts,

    updateStatus,

    deleteContact

};