const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (like CSS)
app.use(express.static('public'));

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
app.post('/submit', (req, res) => {
  // For now, just send a simple response
  res.send('Thank you for submitting your vibe!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
