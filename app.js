// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');

const app = new express(); // Create express object
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser()); 

// Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

// Mongo DB Connection
let URI = "mongodb+srv://monzurmorshedcse:GIbq7VXAzvT3CYJ3@cluster0.mhpu0na.mongodb.net/mshop";
let OPTION = {
    user:'',
    pass:'',
    autoIndex:true
};

mongoose.connect(URI, OPTION).then(
    () => { console.log('Connection established successfully.'); },
    err => { console.log('Something went wrong.', err); }
);

// Path
const path = require('path');

// Routing Implement
app.use('/api/v1',router);

// Connect to frontend
app.use(express.static('client/dist'));

// fronend route
app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
});

// Undefined Route
app.use('*',(req,res) => {
    res.status(404).json({
        status: 'fail',
        data:'not found'
    })
})

module.exports = app ;