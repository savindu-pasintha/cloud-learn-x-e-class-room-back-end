
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

var url = "http://naveendevinda.netlify.app" || "http://localhost:3000" || "*";
const io = require("socket.io")(server, {
	cors: {
		origin: url,
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	  }
});
//ffffffffffff
/*
	cors: {
		origin: "http://localhost:3000",
		origin: "http://naveendevinda.netlify.app",
		methods: [ "GET", "POST" ]
	}
*/


app.get('/', (frontenddata, resp) => {
	resp.send("sever is running  !");
});

	

//acces  the eve file insite PORT or 5000
var PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("server is running on port 5000"))








/*
const express = require("express");
var cors = require('cors');
const http = require("http");
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

//cors erro fix in socket.io
const io = require("socket.io")(server, {
	cors: {
	  origin: "https://localhost:3000",
	  methods: ["GET", "POST"]
	}
  });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());// parse application/json




io.on("connection", (socket) => {

	//whiteboard shairing end point path
	socket.on('canvas-data', (data)=> {
		socket.broadcast.emit('canvas-data', data);
  });
});

//show the data web page
app.get('/',(frontenddata,resp)=>{
	//console.log(frontenddata.body); // catch the front end send data
	resp.send("Back end is working savindu ..");
  });

  //show the data web page
 app.get('/a',(request,response)=>{
	 const data = [
		 { id: '1', nmae: "savindu" },
		 { id: '2', name: "pasintha" },
		 { id: '3', name: "lakmal" }
	 ];
	 response.json(data);
	// response.send({name:"savindu", age:"18"}); // web url to send anytype of data
	//response.json(data); /// web url to add json data set
	 console.log("data"); // catch the front end send data
 });

 //hide the web page view data encripted
 app.post('/b',(request,response)=>{

	 if( 'Finn' === request.body.firstName){
			response.send({id: 'ok-'+'Finn'});
	 }else{
		response.send(request.data);
	 }

	 //response.send("okoooooooooooooooooo");
	const datajj = [
		{ id: '4', nmae: "savindu" },
		{ id: '5', name: "pasintha" },
		{ id: '6', name: "lakmal" }
	];
	//console.log(request.body.lastName);
	response.send(datajj);  //response.json(data); response.send({name:"savindu", age:"18"}); // web url to send anytype of data
	//console.log(request.body.lastName);
	//response.json.stringfy(sending data variable);
	//return "send data";

});


//acces  the eve file insite PORT or 5000
var PORT = process.env.PORT || 5000;
server.listen(5000, () => console.log("server is running on port 5000"))

/*
 npm install
	package.json create file
	server.js     craete
 npm i
  cors -> prevented the cors erro
   express -> nodejs framework
	socket.io -> realtime communication with api
	 nodemon    -> auto restart server
	 body-parser  -> read the frontend using send data set body
	  --save
	  if you want fontend to add
	  "proxy":"http://localhost:5000",
*/

/*
-----------------Start the server------------------------
npm run dev or nodemon server.js 
or
npm run server
or
node server.js
or
npm start
enter
---------------------------------------------------------
"scripts": {
		"dev": "nodemon server.js",
		"server":"nodemon server.js"
		"start": "node server.js",
	},

*/