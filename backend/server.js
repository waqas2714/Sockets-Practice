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
      socket.broadcast.to(room).emit('recieve-message', {message: `${payload} joined the chat.`, sender: "Chat Bot"});
    })

    socket.on('send', (payload)=>{
      console.log("inside send");
      io.to(room).emit('recieve-message', {message: payload, sender: name});
    })

    socket.on('leave-room', (payload)=>{
      io.to(room).emit('recieve-message', {message: payload, sender: "Chat Bot"});
    })

    socket.on('disconnect', () => {
      console.log(`${name} has disconnected from the room ${room}`);
      io.to(room).emit('recieve-message', {message: `${name} was disconnected.`, sender: "Chat Bot"} )
  });
});

server.listen(5000,()=>{
    console.log("Server running on port 5000.");
})

