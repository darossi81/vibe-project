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

const crypto = require('crypto');
const { SurveyToken, Survey } = require('./models');

async function generateTokensForSurvey(surveyId, employeeEmails) {
  for (const email of employeeEmails) {
    const token = crypto.randomBytes(16).toString('hex');  // Generate a 32-character hex token
    await SurveyToken.create({
      token,
      survey_id: surveyId,
    });
    console.log(`Token generated for ${email}: ${token}`);
    // Here, you could send the token via email or other means
  }
}

// Example usage
// generateTokensForSurvey(1, ['employee1@example.com', 'employee2@example.com']);
