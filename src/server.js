const express = require('express');
const fileUpload = require('express-fileupload');

require('./database');

const app = express();

app.use(express.json());
app.use(fileUpload());

app.use('/', require('./app/routes/index'));

app.listen(3333, () => {
  // eslint-disable-next-line
  console.log('Server started!');
});
