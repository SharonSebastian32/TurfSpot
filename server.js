import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import morgan from "morgan";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);
// routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 1234;

// Function to start the server
const startServer = async () => {
  try {
    // First, connect to the database
    await connectDB();

    // If database connection is successful, start the server
    app.listen(port, () => {
      logger.info(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
