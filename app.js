const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks  = require('nunjucks');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// config nunjucks!
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
  res.render('error.html');
});

// app.get('/', function(req, res) {
//   res.render('index.html', {
//     title : 'My First Nunjucks Page',
//     items : [
//       { name : 'item #1' },
//       { name : 'item #2' },
//       { name : 'item #3' },
//       { name : 'item #4' },
//     ]
//   });
// });

module.exports = app;

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})