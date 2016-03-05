var express = require('express')  // npm install express
var app = express()


app.set('port', (process.env.PORT || 5000))  // uncomment me for local host and use port 5000
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  //response.send('Hello World')
  response.sendFile(__dirname + '/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'))
})


var http = require('http').Server(app); // npm install socket.io
var io = require('socket.io')(http);  // socket.io needed to install python and vs express 2013

http.timeout = 0;
http.listen(process.env.PORT || 1337, function(){
  console.log('listening on *:' + process.env.PORT);
});



var mongodb = require('mongodb'); // npm install mongodb
var MongoClient = mongodb.MongoClient;
var uri = 'mongodb://xfyyc:xfyyc@ds037622.mongolab.com:37622/heroku_0dntxs3h';
var collection;


MongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', uri);
    collection = db.collection('xfactoryyc1');

    var qry = { "Community": "Rideau Park" };
    collection.find( qry ).toArray(function(err, docs) {

      if (docs.length > 0) {
        for (j=0; j<docs.length; j++) {
          console.log("population: " + docs[j].Population + ",  Median Income: " + docs[j].Median_household_income);
        }
      }

    });
  }   
});


var Input;
MongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    Input = db.collection('Input');
  }
});



var mySocket;
io.on('connection', function(socket){
  console.log('a user connected');
  mySocket = socket;
  socket.on('sendMsg', function(ret){
    console.log(ret);

    //socket.emit('receiveMsg',"World2");

    if (true) {  // THIS IS FOR TESTING!!!!!!
      var qry = { "id":2 };
      Input.find( qry ).toArray(function(err, docs) {  
        if (docs.length > 0) {
          for (j=0; j<docs.length; j++) {        
            mySocket.emit('receiveMsg', JSON.stringify(docs[j]));  //Server2Client
          }
        }
      });
    }


  });

});



//Input = db.collection('Input');
setInterval(function() {

  // find a question that is unanswered and return it to that user
  console.log("a spin");
  var qry = { "returned": false, "answered":true, "id":1 };
  Input.find( qry ).toArray(function(err, docs) {  
    
    if (docs.length > 0) {
      
      console.log("found something");
      for (j=0; j<docs.length; j++) {             
        console.log(JSON.stringify(docs[j]));
        
        Input.update(qry, {$set: {returned:true}}, function (err, result) {
          
          if (err) {
            console.log(err);
          } else {

            mySocket.emit('receiveMsg', JSON.stringify(docs[j]));  //Server2Client
            console.log("emitted to client");

          } 

        });

        break;
      }
    }

  }); 

}, 2*1000);







