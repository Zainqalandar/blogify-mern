const express = require('express');
const app = express();
const cors = require('cors');

const authRouter = require('./routes/auth.route');

const authMiddleware = require('./middleware/auth.middleware');


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);



module.exports = app;