const express = require("express");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

const {

    createContact,

    getAllContacts,

    updateStatus,

    deleteContact

} = require("../controllers/contact.controller");
router.patch("/:id/status", updateStatus);
router.delete("/:id", authenticate, deleteContact);

const {

    validateContact

} = require("../middleware/validation.middleware");

router.get("/", getAllContacts);

router.post("/", validateContact, createContact);

module.exports = router;