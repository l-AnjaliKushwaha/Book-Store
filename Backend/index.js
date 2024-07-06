const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(cors());
app.use(express.json());

// Route handler
app.get("/", (req, res) => {
  res.send("Hello World");
});

// MongoDB configuration
const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Established");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Start server and connect to database
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    process.exit(1); // Exit the process if server fails to start
  }
};

startServer();
