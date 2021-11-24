var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const env = require("dotenv").config();
//const auth = require('./middlewares/auth')


const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./document/apiDisney.json')

const authRouter = require('./routes/authRouter');
const moviesRouter = require('./routes/moviesRouter');
const charactersRouter = require('./routes/characterRouter');
const relateRouter = require('./routes/relateRouter')

var app = express();

app.use(express.static(path.join(__dirname, 'uploads')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth",authRouter);

//app.use(auth);

app.use("/movies", moviesRouter);
app.use("/characters", charactersRouter);
app.use("/relate",relateRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
