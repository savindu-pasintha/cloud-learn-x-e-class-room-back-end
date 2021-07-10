const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors);

const io = require("socket.io")(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST"],
	  }
});


io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('disconnect', () => console.log('Client disconnected'));
  });

server.listen(PORT, () => console.log("server is running on port 5000"));

