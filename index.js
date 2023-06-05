const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes defined in routes.js
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
