/*var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');



app.use(express.static("public"));
app.get("/", (req, res) => {
	//res.send("hello world!")
	res.sendFile(path.join(__dirname + '/lab5.html'));
	//res.sendFile(__dirname + '/lab5.html');
});


app.listen(3000, ()=> console.log('server ready'))
*/

var port = process.env.PORT || 3000;
let express = require('express')
let app = express();
let path = require('path');
let mod = require('./users');
let bodyParser = require('body-parser');
var cors = require('cors')
const router = express.Router();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let userRoutes = require('./routes/userRoute');

//app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname,'public')));



/*  -- we can also write our own middleware -- */
app.use((req,res,next) => {
    console.log('Going through first middleware');
    req.me = 12; // added a new property to the request
    next(); // Need to call next(), otherwise the request won't go to the next middleware
});

app.use((req,res,next) => {
    console.log('Going through second middleware');
    next();
});
/* -------------------------------------------- */

app.use(userRoutes);

app.listen(port, () => console.log('Server ready'))



