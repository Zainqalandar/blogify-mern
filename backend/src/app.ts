const express = require('express');
const app = express();
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/v1/blogs', postRouter);



module.exports = app;