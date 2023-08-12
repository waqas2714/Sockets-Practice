const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io')
// const cors = require('cors');

// app.use(cors());

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});


io.on('connection', (socket) => {
    const {name, room} = socket.handshake.query;
    console.log(`${name} has connected to the room ${room}`);

    socket.join(room);
    
    socket.emit('welcome', `${name}, Welcome to Chatcord!`);

    socket.on('joined-room',(payload)=>{
      socket.broadcast.to(room).emit('send-message', {message: `${payload} joined the chat.`, sender: name});
    })

    socket.on('send-message',(payload)=>{
      io.to(room).emit('send-message', {message: payload, sender: name});
    })

    socket.on('leave-room', (payload)=>{
      io.to(room).emit('send-message', {message: payload, sender: name});
    })
});

server.listen(5000,()=>{
    console.log("Server running on port 5000.");
})

// const app = require('express')();
// const server = require('http').createServer(app);
// const socket = require('socket.io');

// const io = socket(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         credentials: true,
//     },
// });

// let rooms = {};

// io.on('connection', (socket) => {
//     const { name, room } = socket.handshake.query;
//     console.log(`${name} has connected to the room ${room}`);

//     socket.join(room);
    
//     socket.emit('welcome', `${name}, Welcome to Chatcord!`);

//     socket.on('joined-room', (payload) => {
//         if (!rooms[room]) {
//             rooms[room] = [];
//         }
//         rooms[room].push({ name, socketId: socket.id });
//         io.to(room).emit('users', rooms[room]);
//     });

//     socket.on('send-message',(payload)=>{
//             io.to(room).emit('send-message', {message: payload, sender: name});
//           })
      
//     socket.on('leave-room', (payload)=>{
//           io.to(room).emit('send-message', {message: payload, sender: name});
//     })

//     socket.on('disconnect', () => {
//         if (rooms[room]) {
//             const index = rooms[room].findIndex(user => user.name === name);
//             if (index !== -1) {
//                 rooms[room].splice(index, 1);
//                 io.to(room).emit('users', rooms[room]);
//             }
//         }
//     });

//     // ...
// });

// server.listen(5000, () => {
//     console.log("Server running on port 5000.");
// });

// const STALE_USER_TIMEOUT = 10 * 60 * 1000; // 10 minutes (adjust as needed)

// setInterval(() => {
//     for (const roomName in rooms) {
//         rooms[roomName] = rooms[roomName].filter(user => {
//             const socket = io.sockets.connected[user.socketId];
//             if (socket && socket.connected) {
//                 return true; // User is still connected
//             }
//             return false; // User is stale, remove from list
//         });

//         io.to(roomName).emit('users', rooms[roomName]);
//     }
// }, STALE_USER_TIMEOUT);
