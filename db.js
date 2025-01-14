import dotenv from "dotenv";
dotenv.config();  // This should be at the top of your file

import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        if (!process.env.MongoURL) {
            console.log("MongoDB URL:", process.env.MongoURL);  // This should show the MongoURL now
            console.error("MongoDB connection string (MONGO) is not defined in the environment variables.");
            process.exit(1);
        }

        const connect = await mongoose.connect(process.env.MongoURL);  // Simplified without deprecated options
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default ConnectDB;
