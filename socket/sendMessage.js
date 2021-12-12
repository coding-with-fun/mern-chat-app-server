const sendMessage = (socket, io) => {
    socket.on("sendMessage", (message, callback) => {
        let messageData = {
            message: {
                from: socket.name,
                type: "message",
                text: message,
            },
        };

        io.to(socket.room).emit("serverMessage", messageData);

        callback();
    });
};

module.exports = sendMessage;
