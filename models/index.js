'use strict';

var fs = require('fs'),
	path = require('path');

module.exports = function (sequelize) {

	var models = {};

	fs
		.readdirSync(__dirname)
		.filter(function(file) {
			return file.indexOf('.') !== 0
				&& file !== 'index.js'
				&& file.slice(-3) === '.js'
				;
		})
		.forEach(function(file) {
			var model = sequelize.import(path.join(__dirname, file));
			models[model.name] = model;
		});

	Object.keys(models).forEach(function(modelName) {
		if (models[modelName].options.hasOwnProperty('associate')) {
			models[modelName].options.associate(models);
		}
	});

	return models;
};
