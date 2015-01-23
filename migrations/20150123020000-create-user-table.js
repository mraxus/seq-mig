'use strict';

var tableName = 'Users';

module.exports = {
	up: function (QueryInterface, Sequelize) {
		return QueryInterface.createTable(tableName, {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				username: {
					type: Sequelize.TEXT,
					unique: true
				},
				email: Sequelize.TEXT
			},
			{ });
	},
	down: function (QueryInterface) {
		return QueryInterface.dropTable(tableName);
	}
};