const users = {

    users: [],

    // Join user to chat
    userJoin: (id, username, color, playerId) => {
        // 
        const user = { id, username, color, playerId };
    
        users.users.push(user);

        users.users.filter(e => e);
    
        console.log(users.users);

        return user;
    },

    // Get current user 
    getCurrentUser: (id) => {

        return users.users.find(user => user.id === id);
    },

    // User leave chat
    userLeave: (id) => {

        console.table(users.users)
        const index = users.users.findIndex(user => user.id === id);

        if (index !== -1) {

            return users.users.splice(index, 1)[0];
        };
    },
};

module.exports = users;