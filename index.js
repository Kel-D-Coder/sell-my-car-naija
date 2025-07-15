// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const routes = require('./routes/routes');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
