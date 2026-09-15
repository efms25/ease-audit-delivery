#!/usr/bin/env node
const { app } = require('./src/app.js');
const connection = require('./src/database/connection.js');

// Start app
app(connection);