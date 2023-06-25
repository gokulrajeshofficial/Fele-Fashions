const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const indexRouter = require('./routers/routers');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

app.listen(port, () => {
  console.log('Server is running on port :' , port);
})