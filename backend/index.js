const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 4000;


// CORS
const corsOptions = {
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],
  allowedHeaders: '*',
};


app.use(cors(corsOptions));


// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected');

  // Handle document updates
  socket.on('updateDocument', (newCode) => {
    console.log('Received Document Update:', newCode);
    io.emit('documentUpdated', newCode);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
