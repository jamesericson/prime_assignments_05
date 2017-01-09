var express = require( 'express' );
var app = express();

var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var path = require( 'path' );

var port = 8080;

app.listen( port, function(){
  console.log('Up and Listening | Port: ', port);
});

app.use( express.static('public') );
app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );

//db
mongoose.connect( 'mongodb://localhost:27017/petsDB' );

app.get( '/', function(req, res){
  res.sendFile( path.join(__dirname, '../public/views/index.html' ) );
} );

//routers
app.use( '/petInventory', require('./routes/petInventory') );
