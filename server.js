const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "http://naveendevinda.netlify.app",
		methods: [ "GET", "POST" ]
	}

	
});
/*
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
*/
app.get('/',(req,resp)=>{
  resp.send("Back end is working savindu ..");
});

io.on("connection", (socket) => {

	socket.emit("me", socket.id);
	//emit used to send data

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});

	//whiteboard shairing end point path
	socket.on('canvas-data', (data)=> {
		socket.broadcast.emit('canvas-data', data);
		
  });
})

//acces  the eve file insite PORT or 5000
var PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("server is running on port 5000"))
