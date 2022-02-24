// Importing express package
const express = require('express');

// Importing packages for handling post request 
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

//Importing mongoose package
const mongoose = require('mongoose');

let indexRouter = require('./routes/index');

//let mongodbUrl = 'mongodb://127.0.0.1:27017/';
let mongodbUrl = 'mongodb:mongodb@cluster0.lv1o8.mongodb.net';
let dbName = 'contact_manager';
//mongoose.connect(mongodbUrl+dbName)
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.lv1o8.mongodb.net/contact_manager?retryWrites=true&w=majority')
let db = mongoose.connection;

//Herou connection
// Define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodbUrl + dbName
mongoose.connect(MONGODB_URI)
let db = mongoose.connection;

// Initializing express
const app = express();

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// Set a static folder
app.use(express.static('public'));
let viewRouter = require('./routes/view_routes');
let editRouter = require('./routes/edit_route');
let updateRouter = require('./routes/update');

// Set up a view engine
app.set('view engine', 'ejs');

// Routes
app.use('/view', viewRouter);
app.use('/edit', editRouter);
app.use('/update', updateRouter);

// Check Connection
db.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
   console.log(error);
})



// handling add contact request
app.use('/',indexRouter)

app.use('/add',indexRouter)

//Heroku Port
// Defining the port number
const PORT = process.env.PORT || 5000;

// Defining the port number
//const PORT = 5000;

app.listen(PORT, ()=>{
   console.log(`Server is listening on port ${PORT}`)
})