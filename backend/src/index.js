const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./Controllers/AuthController'); 
const practicRoute = require('./Controllers/InstrumentController');
const instrumentRoute = require('./Controllers/InstrumentController');
const { connection, startConnection } = require('./model/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ✅ Use correct route
app.use('/auth', authRoutes);
app.use('/practice', instrumentRoute);


app.listen(port, () => {
    startConnection();
    console.log(`Server is running on http://localhost:${port}`);
});
