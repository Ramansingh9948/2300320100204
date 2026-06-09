require("dotenv").config();

const Log = require("./src");

async function test() {
  // Check if token exists
  if (!process.env.ACCESS_TOKEN) {
    console.error("ACCESS_TOKEN not found in .env file!");
    return;
  }
  
  console.log(" Using token:", process.env.ACCESS_TOKEN.substring(0, 50) + "...\n");
  
  const result = await Log(
    "backend",
    "info",  // Changed from "error" to "info" for testing
    "handler",
    "Testing logging middleware with new token",
    process.env.ACCESS_TOKEN
  );

  console.log("\n===== FINAL RESULT =====");
  console.log(result);
}

test();