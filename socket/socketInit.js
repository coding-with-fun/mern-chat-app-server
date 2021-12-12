const socket = require("socket.io");
const joinRoom = require("./joinRoom");
const sendMessage = require("./sendMessage");
const socketDisconnect = require("./socketDisconnect");

const socketInit = (server) => {
    const io = socket(server, {
        cors: {
            allowedHeaders: ["Access-Control-Allow-Origin"],
        },
    });

    io.on("connection", (socket) => {
        joinRoom(socket);

        sendMessage(socket, io);

        socketDisconnect(socket);
    });
};

module.exports = socketInit;
