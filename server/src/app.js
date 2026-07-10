const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

// Health Route
app.get("/", (req, res) => {
    res.send("🚀 HD API is running successfully.");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "HD API is running 🚀"
    });
});

module.exports = app;