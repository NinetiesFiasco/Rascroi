var render = function(res,url,title,scripts){
  res.render(url,{
    title: title,
    user: res.locals.user,
    scripts: scripts
  });
}
var raskroi = (req, res, next)=>{
  render(res,"rsk.hbs","Раскрой",null);
};

var about = (req, res, next)=>{
  render(res,"about.hbs","О нас",null);  
};

var main = (req, res, next) => {
  render(res,"main.hbs","Главная",null);
};

var orders = (req,res,next)=>{
  render(res,"orders/cart.hbs","Заказы",["/clientScript/cart.js"]);
};

var armatura = (req,res,next)=>{
  render(res,"orders/armatura.hbs","Арматура",["/clientScript/armatura.js"]);
};

var rascroi = (req,res,next)=>{
  render(res,"orders/rascroi.hbs","Раскрой",["/clientScript/rascroi.js"]);
};

module.exports = {
  raskroi: raskroi, //О раскрое
  about: about,
  main: main,
  orders: orders,
  armatura: armatura,
  rascroi: rascroi //Сам раскрой
};