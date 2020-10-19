const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./routes/index'));

app.listen(3333, () => {
    console.log('server started');
});
