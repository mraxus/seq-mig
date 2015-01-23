'use strict';

var tableName = 'Roles';

module.exports = {
	up: function (QueryInterface, Sequelize) {
		return QueryInterface.createTable(tableName, {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				name: Sequelize.TEXT
			},
			{ });
	},
	down: function (QueryInterface) {
		return QueryInterface.dropTable(tableName);
	}
};