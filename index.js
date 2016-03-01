var express = require('express')  // npm install express
var app = express()

//app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  //response.send('Hello World')
  response.sendFile(__dirname + '/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


var http = require('http').Server(app); // npm install socket.io
var io = require('socket.io')(http);  // socket.io needed to install python and vs express 2013

http.timeout = 0;
http.listen(process.env.PORT || 1337, function(){
  console.log('listening on *:' + process.env.PORT);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('msg', function(msg){
  	console.log(msg);

  	socket.emit('msg',"World");
  });
});



var mongodb = require('mongodb'); // npm install mongodb 
var MongoClient = mongodb.MongoClient;

var uri = 'mongodb://xfyyc:xfyyc@ds037622.mongolab.com:37622/heroku_0dntxs3h';
var collection;

// Use connect method to connect to the Server
MongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', uri);


    collection = db.collection('xfactoryyc1');

    var qry = { "email": objmsg.email };
    collection.find( qry2 ).toArray(function(err, docs) {  
      
      if (docs.length > 0) {
        for (j=0; j<docs.length; j++) {             
          console.log(docs[j].Community);
        }
      }

    }); 


  }
});