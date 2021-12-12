const Users = [];
const _ = require("lodash");

const addUser = (user) => {
    const { name, room, id } = user;

    const existingUserIndex = _.findIndex(Users, function (user) {
        return user.name === name;
    });

    if (existingUserIndex === -1) {
        Users.push(user);

        return {
            user,
            Users,
        };
    } else {
        return {
            error: "A user with that name already exists.",
        };
    }
};

const removeUser = (user) => {
    const { name, room, id } = user;

    const existingUserIndex = _.findIndex(Users, function (user) {
        return user.id === id;
    });

    if (existingUserIndex !== -1) {
        Users.splice(existingUserIndex, 1);
    }

    return {
        Users,
    };
};

const getUsers = () => {
    return {
        Users,
    };
};

module.exports = {
    addUser,
    removeUser,
    getUsers,
};
