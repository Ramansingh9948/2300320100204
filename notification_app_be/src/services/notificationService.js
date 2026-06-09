const notifications = require("../data/notifications");

/**
 * Retrieve all registered notifications
 */
function retrieveAll() {
  return notifications;
}

/**
 * Register a new notification
 */
function addNewNotification(inputData) {
  const item = {
    id: String(Date.now()),
    title: inputData.title,
    message: inputData.message,
    type: inputData.type,
    read: false,
    createdAt: new Date(),
  };

  notifications.push(item);
  return item;
}

/**
 * Toggle the read state of a notification to true
 */
function toggleReadState(notificationId) {
  const match = notifications.find((n) => n.id === notificationId);

  if (!match) {
    return null;
  }

  match.read = true;
  return match;
}

/**
 * Fetch and sort the top 10 prioritized notifications
 */
function fetchPrioritizedList() {
  const categoryWeights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  // Sort by category weight descending, then by creation time descending
  return [...notifications]
    .sort((first, second) => {
      const weightDiff = (categoryWeights[second.type] || 0) - (categoryWeights[first.type] || 0);
      if (weightDiff !== 0) {
        return weightDiff;
      }
      return new Date(second.createdAt) - new Date(first.createdAt);
    })
    .slice(0, 10);
}

module.exports = {
  retrieveAll,
  addNewNotification,
  toggleReadState,
  fetchPrioritizedList,
};