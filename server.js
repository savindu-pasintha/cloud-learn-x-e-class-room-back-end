const express = require("express");
const jwt = require('jsonwebtoken');
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

io.on('connection', (socket) => {
	console.log('Client connected'+socket.id);

	socket.on('disconnect', () => {
		console.log('Client disconnected');
		 con = "connected"});

	socket.emit("me", socket.id);

	socket.on('canvas-data', (getDataFromClient) => {
		socket.broadcast.emit('canvas-data',getDataFromClient);
		canvas = getDataFromClient;
     });

    //  socket.to('room1').emit('I am room 1 from server');
	// io.to("room 237").emit("a new user has joined the room"); 
//https://stackoverflow.com/questions/17697199/socket-io-rooms-doesnt-work
/*-----------------------------socketserve.io --------------------------------------------- */


//1-click join session and execute  socket.emi("join_room","123456")
 socket.on("join_room",(room) => {
    socket.join(room);//ok
	console.log("joined room is -"+room);
	socket.broadcast.emit("join_room",room);//sent all clent
	// console.log("All Rooms Array - "+room);
  });

  socket.on('drawing',(msg)=> {
	// var arr = ["room1","room2"],push();
	let allRooms = socket.rooms;
	let clientRooms = Array.from(allRooms);
	//iterate through the rooms and emmit draw to all the rooms in the array
	for(let i=0; i<=clientRooms.length; i++){socket.to(clientRooms[i]).emit("drawing",msg);}
	
  });  

  socket.on('text', (msg) => {
	let allRooms = socket.rooms;
	let clientRooms = Array.from(allRooms);
	for(let i=0; i<=clientRooms.length; i++) {socket.to(clientRooms[i]).emit("text",msg);}

});
socket.on('mousepointer', (msg) => {
	console.log(msg);
	let allRooms = socket.rooms;
	let clientRooms = Array.from(allRooms);
	for(let i=0; i<=clientRooms.length; i++) {socket.to(clientRooms[i]).emit("mousepointer",msg);}

})

socket.on('image', (msg)=>{
	let allRooms = socket.rooms;
	let clientRooms = Array.from(allRooms);
	for(let i=0; i<=clientRooms.length; i++){socket.to(clientRooms[i]).emit("image",msg);}
})

  socket.on("message", (msg) => {
	let allRooms = socket.rooms;
	let clientRooms = Array.from(allRooms)
	for(let i=0; i<=clientRooms.length; i++) {
		socket.to(clientRooms[i]).emit("message",msg);
	  }
  });

  socket.on('chat-message',(msg)=> {
	console.log(msg)
	socket.broadcast.emit('chat-message', msg);
	//chat.push(msg);
	/* let allRooms = socket.rooms;let clientRooms = Array.from(allRooms);for(let i=0; i<=clientRooms.length; i++) {socket.to(clientRooms[i]).emit('chat-message', msg);
    */  
    });  

  });


  app.get('/', (req, res) => {
	res.send("./"+  req.body 
	);
	
  });

  app.get('/a', (req, res) => {
	res.send("./a"+req.body);
  });
  
  app.get('/aa', (req, res) => {
	res.send("./aa"+req.body);
  });

  app.post('/login', (req, res) => {
	res.send("./login"+req.body);
	console.log(req.body)
  });
  
  app.post('/signup', (req, res) => {
	res.send("./signup"+req.body);
	console.log(req.body)
  });

  app.get('/api', (req, res) => {
	res.json({
	  message: 'Welcome to the API'
	});
  });
  
  app.post('/api/posts', verifyToken, (req, res) => {  
	jwt.verify(req.token, 'secretkey', (err, authData) => {
	  if(err) {
		res.sendStatus(403);
	  } else {
		res.json({
		  message: 'Post created...',
		  authData
		});
	  }
	});
  });
  
  app.post('/api/login', (req, res) => {
	// Mock user
	const user = {
	  id: 1, 
	  username: 'brad',
	  email: 'brad@gmail.com'
	}
  res.send(req.body)
  
	jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
	  res.json({
		token
	  });
	});
  });
  
  // FORMAT OF TOKEN
  // Authorization: Bearer <access_token>
  
  // Verify Token
  function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
	  // Split at the space
	  const bearer = bearerHeader.split(' ');
	  // Get token from array
	  const bearerToken = bearer[1];
	  // Set the token
	  req.token = bearerToken;
	  // Next middleware
	  next();
	} else {
	  // Forbidden
	  res.sendStatus(403);
	}
}


server.listen(PORT, () => console.log('server is running on port '+PORT));
