'use strict';

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {

		username: {
			type: DataTypes.TEXT,
			unique: true
		},
		email: {
			type: DataTypes.TEXT,
			validate: {
				isEmail: true
			}
		}
	}, {
		associate: function(models) {
			User.belongsTo(models.Role, { foreignKey: 'role_id' });
		}
	});

	return User
};
