import mongoose from "mongoose";
import logger from "../utils/logger.js";
const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false,
    };
    await mongoose.connect(process.env.MONGO_URI, options);
    logger.info("Successfully connected to MongoDB");
    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
      process.exit(1);
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected");
    });
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
