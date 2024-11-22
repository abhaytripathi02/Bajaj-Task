// Importing necessary modules and packages
const express = require("express");
const app = express();
const xss = require('xss-clean');

// Security related library 
const Helmet  = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
 
//import routes
const bfhlRoutes = require('./routes/bfhlRoute');

const errorHandler = require('./middleware/errorHandler')


//Initialize middleware
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 300,
  message: 'Maximun limit of request is exceeds, Please try after 5 min',
  statusCode: 429,
  legacyHeaders: false,
});


// middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//security related middleware
app.use('/api', limiter);
app.disable('x-powered-by');
app.use(Helmet());
// against mongo query selector injection attacks:
app.use(mongoSanitize());
app.use(xss());


app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);


// Routes
app.use('/bfhl', bfhlRoutes);

// Error handler
app.use(errorHandler);

// Testing the server
app.get("/", (req, res) => {
   res.send("<h1>Hello Everyone, Server is Running...<h1>")
});


// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});