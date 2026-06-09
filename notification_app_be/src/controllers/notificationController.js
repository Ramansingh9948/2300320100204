const service = require("../services/notificationService");
const Log = require("../../../logging_middleware/src");

exports.getNotifications = async (req, res) => {
  try {
    await Log("backend", "info", "controller", "Fetching notifications");

    const notifications = service.retrieveAll();

    res.status(200).json(notifications);
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const notification = service.addNewNotification(req.body);

    await Log(
      "backend",
      "info",
      "controller",
      `Notification created: ${notification.title}`
    );

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const notification = service.toggleReadState(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await Log(
      "backend",
      "info",
      "controller",
      `Marked as read: ${req.params.id}`
    );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPriorityInbox = async (req, res) => {
  try {
    await Log("backend", "info", "controller", "Fetching priority inbox");

    const notifications = service.fetchPrioritizedList();

    res.status(200).json(notifications);
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};