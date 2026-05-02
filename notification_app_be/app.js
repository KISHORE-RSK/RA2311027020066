const axios = require("axios");
const Log = require("../logging_middleware/logger");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcjkzMzJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg3OSwiaWF0IjoxNzc3NzA1OTc5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2M3YjE1MzItOWY1Ny00YTAwLWIyY2YtOTM1MzBmODNlNWUwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2lzaG9yZSByIiwic3ViIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIn0sImVtYWlsIjoia3I5MzMyQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2lzaG9yZSByIiwicm9sbE5vIjoicmEyMzExMDI3MDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIiwiY2xpZW50U2VjcmV0IjoiWGFUY3lnRnN4aGhValBCeSJ9.AuGbsJ91PZoV7JMbAiHEoJKAQ8_TldFJu0GXyvL0OZU";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

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

function sortNotifications(data) {
  return data.sort((a, b) => {
    if (priorityMap[b.Type] !== priorityMap[a.Type]) {
      return priorityMap[b.Type] - priorityMap[a.Type];
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}

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

getTopNotifications();