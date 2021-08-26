const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	  }
});

var con , dcon , call, answer , error, canvas , chat = [] ;
var rooms = [];
var socketIDAarray = [];
var   room_id = "";

io.on('connection', (socket) => {
	console.log('Client connected'+socket.id);
	socketIDAarray.push(socket.id);

	socket.on('disconnect', () => {
		console.log('Client disconnected');
		 con = "connected"});

	socket.emit("me", socket.id);
	
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
		dcon ="dis connected";
	});

	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
		error = err.message;
	  });

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
        call =" -call-> " + data.userToCall + " -signal-> " + data.signalData + " -from-> " + data.from + "-name-> " + data.name;
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
		answer = " -To-> " + data.to + " -signal-> " + data.signal;
	});

	socket.on('canvas-data', (getDataFromClient) => {
		socket.broadcast.emit('canvas-data',getDataFromClient);
		canvas = getDataFromClient;
     });

	socket.on('chat-message',(msg)=> {
		console.log(msg)
		io.emit('chat message', msg);
		chat.push(msg);
		
	  });

	
	
    
    //  socket.to('room1').emit('I am room 1 from server');
	// io.to("room 237").emit("a new user has joined the room"); 
//https://stackoverflow.com/questions/17697199/socket-io-rooms-doesnt-work
/*-----------------------------socketserve.io --------------------------------------------- */


//1-click join session and execute  socket.emi("join_room","123456")

var issuid= "";
socket.on("join_room",(room) => {
    socket.join(room);//ok
	console.log("joined room is -"+room);
	socket.broadcast.emit("join_room",room);//sent all clent
	rooms.push(room);
	console.log("All Rooms Array - "+rooms);
  });

socket.on('leave_room',(room)=>{socket.leave(room);});

  socket.on('draw',(msg)=> {
	 // var arr = ["room1","room2"],push();
	 var obj = socket.rooms;
	
	console.log(Object.keys(obj), socket.id)
	//socket.to("123").emit("draw",socketIDAarray[0],msg);
	socket.to("hai").emit("draw",msg);
   
	
//	socket.broadcast.emit('draw', msg);
	console.log(msg);
	console.log('Client connected'+socket.id);
  });  


  socket.on("message", (data) => {
	console.log(data.roomsend,data.message);
	  room_id = data.roomsend;
	 socket.broadcast.emit("message_event_common",data.message);//client to

	//socket.to(room_id).emit(room_id,data);
    console.log("All Rooms-"+rooms);

  });

  socket.on("typing", ({ room }) => {
    socket.to(room).emit("typing", "Someone is typing");
  });

  socket.on("stopped_tying", ({ room }) => {
    socket.to(room).emit("stopped_tying");
  });


  });

  app.get('/', (req, res) => {
	res.send("./"+  req.body +
    "\n" + "connection-" +	con + "-disconnect-" + dcon + 
	    "\n" + "call data-" + call +  
		 "\n"+ "answer data- " + answer + 
		  "\n"+ "chat data- "+ chat);
  });

  app.get('/a', (req, res) => {
	res.send("./a"+req.body);
  });
  
  app.get('/aa', (req, res) => {
	res.send("./aa"+req.body);
  });

server.listen(PORT, () => console.log('server is running on port '+PORT));



