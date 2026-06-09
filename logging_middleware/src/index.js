require("dotenv").config();

const axios = require("axios");
const { STACKS, LEVELS, PACKAGES } = require("./constant");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYW1hbi4yM2IwMTAxMDM5QGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5OTA0NTYsImlhdCI6MTc4MDk4OTU1NiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjUxZTlkYjk5LTg0OTktNGJjNy1iMzYyLTMwNGNiYWU2NTY5MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhbWFuIHNpbmdoIiwic3ViIjoiZjYwOGIwNzktYTk5Zi00NWM5LTk0YTMtYmE2MzZkOGRhZmVkIn0sImVtYWlsIjoicmFtYW4uMjNiMDEwMTAzOUBhYmVzLmFjLmluIiwibmFtZSI6InJhbWFuIHNpbmdoIiwicm9sbE5vIjoiMjMwMDMyMDEwMDIwNCIsImFjY2Vzc0NvZGUiOiJjWHVxaHQiLCJjbGllbnRJRCI6ImY2MDhiMDc5LWE5OWYtNDVjOS05NGEzLWJhNjM2ZDhkYWZlZCIsImNsaWVudFNlY3JldCI6IlNZd1d6a0NISlhVZFZKS3MifQ.JMj1y8YJHxwHGOKH-8wNENSlGZYbN1QV5jNAKqFTyb4";

async function Log(stack, level, packageName, message) {
  try {
    // Validation
    if (!STACKS.includes(stack)) {
      throw new Error(`Invalid stack: ${stack}. Must be one of: ${STACKS.join(', ')}`);
    }

    if (!LEVELS.includes(level)) {
      throw new Error(`Invalid level: ${level}. Must be one of: ${LEVELS.join(', ')}`);
    }

    if (!PACKAGES.includes(packageName)) {
      throw new Error(`Invalid package: ${packageName}. Must be one of: ${PACKAGES.join(', ')}`);
    }


    console.log("Sending log:", { stack, level, packageName, message });

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
        timestamp: new Date().toISOString(),  // Added timestamp
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,  
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log sent successfully!");
    return response.data;
  } catch (error) {
    console.error(" Logging Error:", error.response?.data || error.message);
    console.log(process.env.ACCESS_TOKEN);
    return null;
  }
}

module.exports = Log;