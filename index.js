const http = require("http");
const appData = require("./app");
const server = http.createServer(appData);
require('dotenv').config()

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});