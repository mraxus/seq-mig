'use strict';

module.exports = function (sequelize, DataTypes) {
	var Role = sequelize.define('Role', {
		name: DataTypes.TEXT
	}, { });

	return Role
};
