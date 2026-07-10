const { z } = require("zod");

const contactSchema = z.object({

    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    company: z
        .string()
        .optional(),

    service: z
        .string()
        .min(1, "Service is required"),

    budget: z
        .string()
        .optional(),

    message: z
        .string()
        .min(10, "Message must contain at least 10 characters")

});

const validateContact = (req, res, next) => {

    const result = contactSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({

            success: false,

            errors: result.error.flatten().fieldErrors

        });

    }

    req.body = result.data;

    next();

};

module.exports = {

    validateContact

};