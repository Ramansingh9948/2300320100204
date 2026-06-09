require("dotenv").config();
const applicationInstance = require("./app");

const SERVER_PORT = process.env.PORT || 5008;

applicationInstance.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});