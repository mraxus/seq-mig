'use strict';

var Bluebird = require('bluebird'),
	Sequelize = require('sequelize'),
	Umzug = require('umzug'),

	config = require('./config.json'),
	env = process.env,

	sequelize = new Sequelize(
		env.NAME			|| config.dbName		|| 'test',
		env.USERNAME		|| config.dbUser		|| 'postgres',
		env.PASSWORD		|| config.dbPassword	||  null,
		{
			host: env.HOST	|| config.host			|| 'localhost',
			port: env.PORT	|| config.port			|| 5432,
			dialect: 'postgres',
			logging: false,
			define: {
				charset: 'utf8',
				collate: 'utf8_general_ci',
				underscored: true
			}
		}),
	db = require('./models')(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

var umzug = new Umzug({
	storage: 'sequelize',

	storageOptions: {
		sequelize: db.sequelize,
		tableName: '_migrations'
	},
	upName: 'up',
	downName: 'down',

	migrations: {
		// The params that gets passed to the migrations.
		// Might be an array or a synchronous function which returns an array.
		params: [sequelize.getQueryInterface(), Sequelize, Bluebird],
		path: './migrations',
		pattern: /^\d+[\w-]+\.js$/
	}
});

umzug.up().then(function (migrations) {
	// "migrations" will be an Array with the names of the
	// executed migrations.

	console.log(migrations);

	db.sequelize.sync({ force: false }).complete(function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('ok!')
		}
	});
});
