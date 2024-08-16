const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { SurveyToken, SurveyResponse, sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (like CSS)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the survey form
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Vibe Survey</title>
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
        <h1>Vibe Survey</h1>
        <form action="/submit" method="post">
          <input type="hidden" name="token" value="GENERATED_TOKEN_HERE">
          <label for="vibe">How was your day?</label><br><br>
          <select name="vibe" id="vibe">
            <option value="1">😞</option>
            <option value="2">🙁</option>
            <option value="3">😐</option>
            <option value="4">🙂</option>
            <option value="5">😄</option>
          </select><br><br>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { token, vibe } = req.body;

  // Validate the token
  const surveyToken = await SurveyToken.findOne({ where: { token } });
  if (!surveyToken) {
    return res.status(400).send('Invalid or expired token.');
  }

  // Store the response
  await SurveyResponse.create({
    survey_id: surveyToken.survey_id,
    response: vibe,
  });

  // Invalidate the token if it's single-use
  await surveyToken.destroy();

  res.send('Thank you for submitting your vibe!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
