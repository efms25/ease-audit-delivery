#!/usr/bin/env node
const { app } = require('./src/app.js');
require('dotenv').config();

// Start app
app();