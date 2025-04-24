require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { sequelize } = require('./models/index');
const passport = require('passport');
require('./config/passport')(passport);
const routes = require('./modules/index')
const cors = require('cors');
const startBot = require('./bot/index')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



sequelize.authenticate()
  .then(() => {
    console.log('✅ Подключение к БД успешно установлено');
    
    // Опции синхронизации:
    const syncOptions = {
      // alter: true - осторожно! Может изменять структуру таблиц
      alter: process.env.NODE_ENV === 'development', // только в разработке
      // force: false - никогда не используйте force в production!
      logging: console.log // для отладки SQL-запросов
    };
    
    return sequelize.sync(syncOptions);
  })
  .then(() => {
    console.log('🔄 Модели успешно синхронизированы с БД');
    
    // Проверяем, какие таблицы были созданы/изменены
    return sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
  })
  .then(([results]) => {
    console.log('📊 Доступные таблицы в БД:');
    console.log(results.map(r => r.table_name).join(', '));
  })
  .catch(err => {
    console.error('❌ Ошибка подключения или синхронизации:');
    console.error('Сообщение:', err.message);
    console.error('Код ошибки:', err.parent?.code || 'N/A');
    console.error('SQL запрос:', err.sql || 'N/A');
    
    // Для критических ошибок можно завершить процесс
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

startBot()

module.exports = app;
