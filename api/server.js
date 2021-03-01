const express = require('express');
const carsRouter = require('./cars/cars-router');
const server = express();

// DO YOUR MAGIC
server.use(express.json());
server.use(carsRouter);
server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong. Please, try again later'
	});
});

module.exports = server;
