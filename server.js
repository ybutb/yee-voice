'use strict';
const logger = require( './dist/logger' );
const process = require('process');
const YeeController = require("./dist/controllers/YeeController.js");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5858;

process.title = 'yee-voice';

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	logger.log(reason);
});

process.on('warning', (warning) => {
	console.warn(warning.name);
	console.warn(warning.message);
	console.warn(warning.code);
	console.warn(warning.stack);
});

process.on('uncaughtException', (err) => {
	console.warn(err.name);
	console.warn(err.message);
	console.warn(err.code);
	console.warn(err.stack);
});

app.listen(PORT);
YeeController.init();

process.once('SIGTERM', process.exit);