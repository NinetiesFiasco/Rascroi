import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import s from './Rascroi.module.css';
import Graphic from './Graphic/Graphic';

class Rascroi extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: null,
      error: ""
    };
    this.getData = this.getData.bind(this);
    this.getData();
    this.canvasArr = [];
  }

  getData(){
    let parts = window.location.href.split('/');
    let cartId = parts[parts.length-1];
    
    $.ajax({
      method: "GET",
      url: window.BackEndURL+"orders/rascroi/getByCart/"+cartId,
      dataType: "json",
      success: (response) => {

        if (0===response.success || response.data.length===0){
          this.setState({error:"Ничего не найдено",data:null});
        } else {
          this.setState({data: response.data,error:""});
        }
/*
      var totalMaterial = 0;
      var totalLeave = 0;
      
      for (var i=0;i<data.length;i++){
        view += "<div>";

        view += "<h3>Тип: "+data[i].type+" Диаметр: "+data[i].thick+" мм.</h3>";

        for (var j=0; j<data[i].rascroi.length; j++){   
          var rsc = data[i].rascroi[j];  

          view += "<div>Количество: "+rsc.count+"</div>";
          
          var canvasID = "CanvasID_"+i+"_"+j;

          var canvas = drawSchema(rsc.arr,12000,canvasID);
          view += "<div id='"+canvasID+"'></div>";

          canvasArr.push({
            canvas: canvas,
            canvasID: canvasID
          });


          totalLeave += rsc.leave;
          totalMaterial += 12000;
          //view += "<h4>Остаток  "+rsc.leave+"</h4>";
          view += "<hr>";
        }
        view+="</div>";
        view+="<hr>";
      }

      view += "<div>Суммарный отход:"+(Math.ceil(totalLeave/totalMaterial*10000)/100)+"%</div>";

      $rascroiTable.html(view);

      for (var i=0;i<canvasArr.length;i++){
        $("#"+canvasArr[i].canvasID).append(canvasArr[i].canvas);
      }*/
      }
    });
  }

  render(){
    if (!this.props.user.login)
      return <div>Вы не авторизованы</div>

    console.log("data",this.state.data);
    if (this.state.data == null)
      return <div>Данных нет</div>;


    let totalMaterial = 0, totalLeave = 0;
    this.state.data.map((elem,key) => {
      elem.rascroi.map((rsc,key2) => {
        let cnvId = `CanvasID_${key}_${key2}`;
        totalMaterial += 12000;
        totalLeave += rsc.leave;
        this.canvasArr.push({
          canvas: drawSchema(rsc.arr,12000,cnvId),
          canvasID: cnvId
        });
      });
    });

    return <div>
        <div>Раскройка</div>
        {this.state.data.map((elem,key) => {
          return <div key={key}> 
            <h3>Тип: {elem.type} Диаметр: {elem.thick} мм.</h3>
            {elem.rascroi.map((rsc,key2)=>{
              return <div key={key2}>
                  <div>Количество: {rsc.count}</div>
                  <div id={`CanvasID_${key}_${key2}`}></div>
                </div>
            })}
            <hr/>
          </div>
        })}
        <div>Суммарный отход: {(Math.ceil(totalLeave/totalMaterial*10000)/100)}%</div>
      </div>;
  }

  componentDidUpdate(){    
    console.log('didmount',this.canvasArr);
    this.canvasArr.map(cnv =>{
      $("#"+cnv.canvasID).append(cnv.canvas);
    });
    /*for (var i=0;i<this.canvasArr.length;i++){
      $("#"+this.canvasArr[i].canvasID).append(this.canvasArr[i].canvas);
    }*/
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({})
)(Rascroi);



var drawSchema = function(arr,total,canvasID){

  var arrowWidth=15;
  var arrowHeight=5;

  var point = function(x,y){
    ctx.moveTo(x,y-3);
    ctx.lineTo(x,y+3);  
    ctx.fillText((x-x0)*scale,x, y+12);
  };
  var lenPoint = function(_x,y){
    var x = _x/scale;
    ctx.moveTo(x+x0,y-3);
    ctx.lineTo(x+x0,y+3);  
    //ctx.fillText(_x,x+x0, y+12);
  };
  var line = function(x1,y1,x2,y2){
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
  };
  var lenline = function(x1,y1,x2,y2){
    line(x1/scale+x0,y1,x2/scale+x0,y2);
  };  
  var doubleArrow = function(x1,y1,x2,y2){
    ctx.moveTo(x1,y1);
    ctx.lineTo(x1+arrowWidth,y1+arrowHeight);
    ctx.moveTo(x1,y1);
    ctx.lineTo(x1+arrowWidth,y1-arrowHeight);
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x2-arrowWidth,y2-arrowHeight);
    ctx.moveTo(x2,y2);
    ctx.lineTo(x2-arrowWidth,y2+arrowHeight);
    
    ctx.fillText((x2-x1)*scale,x1+(x2-x1)/2,y1-5);
  };
  var lenDoubleArrow = function(x1,y1,x2,y2){
    doubleArrow(x1/scale+x0,y1,x2/scale+x0,y2);
  };

  var canvas = document.createElement('canvas');
  var scale = 10;
  var len = total/scale;

  canvas.width = len+100;
  canvas.height = 50+arr.length*50;

  var ctx = canvas.getContext("2d");

  
  ctx.font = "12px Arial";

  var x0 = 10, y0=50;
  ctx.beginPath();
  
  // Main Line 
  ctx.moveTo(x0,y0);
  ctx.lineTo(x0+len,y0);
  // End Point
  point(x0+len,y0);
  // Start Point
  point(x0,y0);
  // Start UpLine
  line(x0,y0,x0,y0-25);

  var collector = 0,remember = 0;
  for (var i=0;i<arr.length;i++){
    collector += parseInt(arr[i]);
    lenPoint(collector,y0);

    lenline(collector,y0,collector,y0-25);    
    lenDoubleArrow(remember,y0-20,collector,y0-20);
    
    var  downHeight = y0+5+35*(i+1);
    lenline(collector,y0,collector,downHeight)
    lenDoubleArrow(0,downHeight,collector,downHeight);

    remember = collector;
  }
  lenline(x0,y0,x0,y0+5+35*arr.length);

  ctx.stroke();
  
  return canvas;
}
