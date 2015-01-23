'use strict';

var tableName = 'Users';

module.exports = {
	up: function (QueryInterface, Sequelize) {
		return QueryInterface.addColumn(tableName, 'role_id', {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: "Roles",
				referenceKey: "id",
				onUpdate: "RESTRICT",
				onDelete: "RESTRICT"
			});
	},
	down: function (QueryInterface) {
		return QueryInterface.removeColumn(tableName, 'role_id');
	}
};