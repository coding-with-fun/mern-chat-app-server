const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config();

const socketInit = require("./socket/socketInit");

const PORT = process.env.PORT;

app.use(cors());

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

socketInit(server);
