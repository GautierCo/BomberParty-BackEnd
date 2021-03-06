const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => {
    console.log("Server Started on port 3000");
});


/* Web Socket :  */

const io = require('socket.io')(server, { origins: '*:*'});
const formatMessage = require('./src/utils/messages');
const users = require('./src/utils/users');

const botName = "Gut";

io.on('connection', (socket) => {

    /* PLAYER */

    socket.on('newPlayer', (newPlayer) => {

        io.emit('newPlayer', { socketId: socket.id, username: newPlayer.username, color: newPlayer.color, playerId: socket.id });
        io.emit('refreshPlayer',  users.users );
    });

    socket.on('switch_player', () => {


        io.emit('switch_player', users.getRandomPlayer(users.users));
        console.log("switch player")
    });

    /* CHAT */

    socket.on('joinRoom', ({ username, color }) => {

        const playerId = users.users.length + 1;
        const user = users.userJoin(socket.id, username, color, socket.id);

        socket.emit('message', formatMessage( botName, ' Welcome to chat ' + user.username));

        socket.broadcast.emit('message',  formatMessage( botName, `${user.username} joined the chat`));
    });

    socket.on('chatMessage', (msg) => {   
        
        const user = users.getCurrentUser(socket.id);
        
        if (!user) {
            io.emit('message', formatMessage( botName, " Vous devez avoir un pseudo pour écrire dans le chat"));
            return;
        }

        io.emit('message',  formatMessage(user.username, msg, user.color));
    });

    socket.on('disconnect', () => {

        if(socket.id) {

            const user = users.userLeave(socket.id);

            if (user) {
                io.emit('message',  formatMessage( botName , ` ${user.username} as left the chat`));
                io.emit('player_disconnect', socket.id);
            }
        }
    });
});