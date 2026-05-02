const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service/logs";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcjkzMzJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg3OSwiaWF0IjoxNzc3NzA1OTc5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2M3YjE1MzItOWY1Ny00YTAwLWIyY2YtOTM1MzBmODNlNWUwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2lzaG9yZSByIiwic3ViIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIn0sImVtYWlsIjoia3I5MzMyQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2lzaG9yZSByIiwicm9sbE5vIjoicmEyMzExMDI3MDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIiwiY2xpZW50U2VjcmV0IjoiWGFUY3lnRnN4aGhValBCeSJ9.AuGbsJ91PZoV7JMbAiHEoJKAQ8_TldFJu0GXyvL0OZU";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log sent:", response.data);
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

module.exports = Log;