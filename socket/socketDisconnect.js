const { removeUser } = require("../utils/UsersConfig");

const socketDisconnect = (socket) => {
    socket.on("disconnect", () => {
        const existingUser = {
            id: socket.id,
            name: socket.name,
            room: socket.room,
        };
        const { Users } = removeUser(existingUser);

        socket.leave(socket.room);

        socket.broadcast.to(socket.room).emit("serverMessage", {
            message: {
                from: "admin",
                type: "message",
                text: `${socket.name}, has left the room.`,
            },
            users: Users,
        });
        console.log(`User ${socket.name} has left the socket.`);
    });
};

module.exports = socketDisconnect;
