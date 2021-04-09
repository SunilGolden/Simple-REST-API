const express = require('express');
const course = require('../routes/course');


module.exports = function(app) {
	app.use(express.json());
	app.use('/api/course', course);
}	