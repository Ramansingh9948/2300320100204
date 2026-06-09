const express = require("express");
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markNotificationRead,
  getPriorityInbox,
} = require("../controllers/notificationController");

router.get("/", getNotifications);
router.post("/", createNotification);
router.get("/priority", getPriorityInbox);
router.patch("/:id/read", markNotificationRead);

module.exports = router;