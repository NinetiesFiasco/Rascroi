// Здрасте я Настя

// Подгружаем файл конфигурации
require("dotenv").config();

// Фреймворк приложения
const express = require('express');
const app = express(); 

// понимаем JSON запрос
const bodyParser = require('body-parser');
// читаем куки
const cookieParser = require('cookie-parser');
// шаблонизатор HBS надо его послать лесом
const hbs = require('hbs');
const expressHbs = require("express-handlebars");
// Конфигурация базы Mongo
const mongo = require('./dbConfig/mongo.js');

// index.js
var path = require('path');
global.rootFolder = path.resolve(__dirname);

// Redis для хранения Сессии
const {
  redisClient,
  redisConnect
} = require("./dbConfig/redis.js");

// Мои токены
const {validateToken} = require('./account/tokens/tok.js');

// Папка со статичными файлами (оттуда улетают клиентские JS и CSS)
app.use(express.static(__dirname + "/static"));
// Куки парсер
app.use(cookieParser());

// Первый обработчик проверяет авторизацию
app.use((req, res, next) => {
  var requestToken = req.header("Authorization")
    ? req.header("Authorization")
    : req.cookies.Token;
  
  let token = validateToken(requestToken);

  if (!token){
    res.locals.user = null;
    next();
  }else{
    redisClient().hgetall("rsk:"+token.body.id, function(err, user) {
      res.locals.user = user;
      next();
    });
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8083"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  next();
});

// Если в теле запроса JSON то парсим его
app.use(bodyParser.json());

// Запускаем HBS
app.engine("hbs", expressHbs({
  layoutsDir: "views/layouts", 
  defaultLayout: "master",
  extname: "hbs"
}));
app.set("view engine","hbs");
hbs.registerPartials(__dirname+"/views/partials");
// *************

// Коннектим mongo
mongo.connect(() => {
  redisConnect(()=>{
    serverStart();
  });
});

// Запуск сервера
var serverStart = ()=>{
  // Подключение маршрутов приложения
  app.use("/orders",require('./orders/carts/router.js'));
  app.use("/orders/armatura",require('./orders/armatura/router.js'));
  app.use("/orders/rascroi",require('./orders/rascroi/router.js'));
  app.use("/enter",require('./account/enter/router.js'));
  app.use("/registration",require('./account/registration/router.js'));
  app.use("/example",require('./example/router.js'));

  // тута отдаём все HBSki
  app.use(require('./main/controller.js'));

  // Собственно запуск
  const server = app.listen(process.env.APP_PORT,(err)=>{
    if (!err)
      console.log('Servak udachno startanul');
    else
      console.log("Est zaparka: "+err);
  });
  /// при ошибки закрыть соединения с БД
  server.on("error",(err)=>{
    console.log("Zakrivau DB");
    require("./dbConfig/mysql.js").end();
    mongo.close();
    redisClient().quit();
  });
}


