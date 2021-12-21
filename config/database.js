const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://ppljxifixnwhgj:866ee9eb42d9b7c7f0ebb4b2b46ba851589b86e6c6642e3aafe7ae67dcc42265@ec2-3-230-149-158.compute-1.amazonaws.com:5432/d6ru5s4ml325it',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
