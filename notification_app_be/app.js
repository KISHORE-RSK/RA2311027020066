const axios = require("axios");
const Log = require("../logging_middleware/logger");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

// ⚠️ Always keep this updated (token expires)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcjkzMzJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzk1MywiaWF0IjoxNzc3NzAzMDUzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDgyN2NhNTAtNGFkNi00YjBhLTg3MmItYzFiMTAxYjI0ZTMzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2lzaG9yZSByIiwic3ViIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIn0sImVtYWlsIjoia3I5MzMyQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2lzaG9yZSByIiwicm9sbE5vIjoicmEyMzExMDI3MDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIiwiY2xpZW50U2VjcmV0IjoiWGFUY3lnRnN4aGhValBCeSJ9.isp8qSi7Ml73Z3T8k9mI2HqQtZXnv7D7fUegLeUYmYM";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

// 🔹 Fetch notifications
async function fetchNotifications() {
  try {
    await Log("backend", "info", "service", "Fetching notifications");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const notifications = response.data.notifications;

    await Log("backend", "info", "service", "Notifications fetched successfully");

    return notifications;
  } catch (error) {
    await Log("backend", "error", "service", "Failed to fetch notifications");
    console.error("Fetch Error:", error.message);
    return null;
  }
}

// 🔹 Sort notifications
function sortNotifications(data) {
  return data.sort((a, b) => {
    if (priorityMap[b.Type] !== priorityMap[a.Type]) {
      return priorityMap[b.Type] - priorityMap[a.Type];
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}

// 🔹 Get top 10
async function getTopNotifications() {
  const data = await fetchNotifications();

  if (!data) {
    console.log("No data received. Check token.");
    return;
  }

  const sorted = sortNotifications(data);
  const top10 = sorted.slice(0, 10);

  await Log("backend", "info", "service", "Top notifications calculated");

  console.log("Top 10 Notifications:");
  console.log(top10);
}

// 🔹 Run
getTopNotifications();