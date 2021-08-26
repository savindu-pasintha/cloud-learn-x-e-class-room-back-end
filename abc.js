const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

//acces  the eve file insite PORT or 5000
const PORT = process.env.PORT || 5000;

//fix socke.io origin erro all arigins -- > origin:"*"
//var url = "http://naveendevinda.netlify.app" || "http://localhost:3000" || "*";

const io = require("socket.io")(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	  }
});


/*
	cors: {
		origin: "http://localhost:3000",
		origin: "http://naveendevinda.netlify.app",
		methods: [ "GET", "POST" ]
	}
*/
var sk = "";
app.get('/',(frontenddata,resp)=>{
	console.log(frontenddata.body); // catch the front end send data
	resp.send("Back end is working savindu ..socket working-" + sk);
  });
 
 app.post('/a',(request,response)=>{
	 response.send({name:"savindu", age:"18"});
	 console.log(request.body) // catch the front end send data
 }); 

 
io.on("connection", (socket) => {
     sk = "connected";
	socket.emit("me", socket.id);
	//emit used to send data

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
	  });

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});

	//whiteboard shairing end point path bradcast used to share with all
	socket.on('canvas-data', (getDataFromClient) => {
		socket.broadcast.emit('canvas-data',getDataFromClient);
     });

});
server.listen(PORT, () => console.log("server is running on port 5000"))
