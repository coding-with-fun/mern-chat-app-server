const { addUser } = require("../utils/UsersConfig");

const joinRoom = (socket) => {
    socket.on("joinRoom", ({ name, room }, callback) => {
        room = room.trim().toLowerCase();

        socket.name = name;
        socket.room = room;

        const newUser = {
            id: socket.id,
            name,
            room,
        };
        const { user, Users, error } = addUser(newUser);

        let messageData = {
            message: {
                from: "admin",
                type: "message",
                text: `${name}, welcome to the room ${room}`,
            },
            users: Users,
            user,
        };

        if (error) {
            messageData = {
                ...messageData,
                message: {
                    ...messageData.message,
                    type: "error",
                    text: error,
                },
            };

            callback(messageData);
        } else {
            socket.join(room);

            socket.broadcast.to(socket.room).emit("serverMessage", {
                message: {
                    from: "admin",
                    type: "message",
                    text: `${name}, has joined the room.`,
                },
                users: Users,
            });
            socket.emit("serverMessage", messageData);
        }
    });
};

module.exports = joinRoom;
