const express = require("express");
const cors = require("cors");

const notificationApiRoutes = require("./routes/notificationRoutes");

const application = express();

application.use(cors());
application.use(express.json());

// Base status checker route
application.get("/", (req, res) => {
  console.log("Status check: Notification API root accessed");
  return res.status(200).send("Notification microservice is active");
});

// Mount the API endpoints
application.use("/api/notifications", notificationApiRoutes);

module.exports = application;