const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // This creates a SQLite file in your project root
});

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  }
});

const Survey = sequelize.define('Survey', {
  question: {
    type: DataTypes.TEXT,
  }
});

const SurveyToken = sequelize.define('SurveyToken', {
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  expiry_date: {
    type: DataTypes.DATE,
  }
});

const SurveyResponse = sequelize.define('SurveyResponse', {
  response: {
    type: DataTypes.STRING,
  }
});

SurveyToken.belongsTo(Survey);
SurveyResponse.belongsTo(Survey);

// Sync models to create tables
sequelize.sync();

module.exports = { Employee, Survey, SurveyToken, SurveyResponse, sequelize };
