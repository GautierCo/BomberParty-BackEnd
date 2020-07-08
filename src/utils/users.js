const users = {

    users: [],
    lastRandomPlayer: 0,

    // Join user to chat
    userJoin: (id, username, color, playerId) => {
        // 
        const user = { id, username, color, playerId };
    
        users.users.push(user);

        users.users.filter(e => e);

        return user;
    },

    // Get current user 
    getCurrentUser: (id) => {

        return users.users.find(user => user.id === id);
    },

    // User leave chat
    userLeave: (id) => {

        const index = users.users.findIndex(user => user.id === id);

        if (index !== -1) {

            return users.users.splice(index, 1)[0];
        };
    },

    generateRandomPlayer: (nbrPlayer) => {

        return Math.floor(Math.random() * ( (nbrPlayer + 1) - 1 ) + 1 );
    },
    
    getRandomPlayer: (allPlayers) => {

        let randomPlayer = users.generateRandomPlayer(allPlayers.length);

        if ( randomPlayer == users.lastRandomPlayer ) {

            while( randomPlayer == users.lastRandomPlayer ) {

                randomPlayer = users.generateRandomPlayer(allPlayers.length);
                console.log("while" + randomPlayer);
            }
        }

        console.log("randomPlayer" + randomPlayer);

        users.lastRandomPlayer = randomPlayer;

        console.log("RANDOM PLAYER ID SELECT : " + allPlayers[randomPlayer-1].id + " Pseudo : " + allPlayers[randomPlayer-1].username);

        randomPlayerId = allPlayers[randomPlayer-1].id;

        return { randomPlayer: randomPlayer, randomPlayerId: randomPlayerId };
    },
};

module.exports = users;