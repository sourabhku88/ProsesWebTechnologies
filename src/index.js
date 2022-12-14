const express = require('express');
const mongoose = require('mongoose');
const rout = require('./router/rout');

const PORT = 1020 || process.env.PORT;
const app = express();

app.use(express.json());

mongoose.connect(`mongodb+srv://sourabh:sourabh@cluster0.vvdx1ge.mongodb.net/prosesassignment`).then(_ => console.log('DB connected')).catch(err => console.log(err));

app.use('/', rout);

app.listen(PORT, () => console.log(`server running on ${PORT}`));