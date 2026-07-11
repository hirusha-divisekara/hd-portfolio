require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8080;

// Railway requires listening on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 HD API running on port ${PORT}`);
});