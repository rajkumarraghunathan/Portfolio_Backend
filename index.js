const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./Connect/mongoose');
const route = require('./Routes/route');

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'https://main--sage-kitten-587de6.netlify.app',
    credentials: true,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin: https://main--sage-kitten-587de6.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Database connection
db();

// Include routes
app.use(route);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
