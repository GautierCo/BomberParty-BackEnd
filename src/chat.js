const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { origins: '*:*'});
const formatMessage = require('./utils/messages');
const users = require('./utils/users');

const game = {

    botName: "GutBot",
    currentUser: null,

    message: () => {

        io.on('connection', (socket) => {
 
            socket.on('joinRoom', ({ username, color }) => {

                const playerId = users.users.length + 1;
                const user = users.userJoin(socket.id, username, color, playerId);
                console.log(username);

                io.emit('newPlayer', { socketId: socket.id, username: user.username, color: user.color, playerId: user.playerId });

                socket.emit('message', formatMessage(game.botName, ' Welcome to chat ' + user.username));
        
                socket.broadcast.emit('message',  formatMessage(game.botName, `${user.username} joined the chat`));
            });

            socket.on('chatMessage', (msg) => {   
                
                const user = users.getCurrentUser(socket.id);
                
                if (!user) {
                    io.emit('message', formatMessage(game.botName, " Vous devez avoir un pseudo pour écrire dans le chat"));
                    return;
                }

                io.emit('message',  formatMessage(user.username, msg, user.color));
                console.log("Pseudo: " + user.username + "Msg: " + msg + "Color: " + user.color);
            });

            socket.on('disconnect', () => {

                if(socket.id) {
                    const user = users.userLeave(socket.id);
                    console.log(socket.id);
                    if (user) {
                        io.emit('message',  formatMessage( game.botName , ` ${user.username} as left the chat`));
                    }
                }


            });
        });
    },

    game: () => {

    },
};

game.message();
game.game();

server.listen(8080, () => {
    console.log("WebSocket Started on port 8080");
});

module.exports = game;