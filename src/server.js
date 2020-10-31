const express = require('express');

require('./database');

const app = express();

app.use(express.json());

app.use('/', require('./app/routes/index'));

app.listen(3333, () => {
  console.log('Server started!');
});
