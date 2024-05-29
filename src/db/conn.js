const mongoose = require("mongoose");

const uri = "mongodb+srv://PgFinder:pgfinderr2@pgfinder.oi7gqrt.mongodb.net/PgFinder?retryWrites=true&w=majority&appName=PgFinder";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
