import {connect} from 'react-redux';
import s from './ArmaturaRedactor.module.css';

class ArmaturaRedactor extends React.Component{
  constructor(props){
    super(props);
    this._save = this._save.bind(this);
    this._cancel = this._cancel.bind(this);
    this.rType = React.createRef();
    this.rThick = React.createRef();
    this.rLength = React.createRef();
    this.rCount = React.createRef();
    this._get = this._get.bind(this);
  }

  _save(){
    let armatura = this.props.armatura;
    let url,method;
    if (armatura.redactedId != "-1"){
      let arm = armatura.allArmatura[armatura.redactedId];
      url = window.BackEndURL+"orders/armatura/update/"+arm._id;
      method = "PUT";
    }else{
      url = window.BackEndURL+"orders/armatura/add";
      method = "POST";
    }


    let parts = window.location.href.split("/");
    let guidCart = parts[parts.length-1];

    let postObject = {
      type: this.rType.current.value,
      thick: this.rThick.current.value,
      length: this.rLength.current.value,
      count: this.rCount.current.value,
      guidCart: guidCart
    };
    
    $.ajax({
      method: method,
      url: url,
      headers: {
        "Authorization": localStorage.getItem("Token")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(postObject),
      success: (answer)=>{
        if (answer.success === 0){
          this.setState({error: answer.message});
        }
        else if (answer.success === 1){          
          this.setState({error:null});
          this.props.showRedactor(false);
          this._get();
        }
      },
      error: (err)=>{
        console.log('error',err);
      }
    });
  }
  _get(){
    let parts = window.location.href.split("/");
    let guidCart = parts[parts.length-1];

    $.ajax({
      method: "GET",
      url: window.BackEndURL+"orders/armatura/getByCart/"+guidCart,
      headers: {
        "Authorization": localStorage.getItem("Token")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (answer)=>{
        if (answer.success === 0){
          this.setState({error: answer.message});
          this.props.setData(null);
        }
        else if (answer.success === 1){          
          this.props.setArmatura(answer.data);
          this.setState({error:null});
        }
      },
      error: (err)=>{
        console.log('error',err);
      }
    });
  }
  _cancel(){
    this.props.showRedactor(false);
    this.props.setRedactedID(-1);
  }


  render(){
    console.log('CA_props',this.props);
    if (this.props.armatura.allArmatura == null)
      return <div>Нет данных</div>;

    let armatura = this.props.armatura;
    let cur;
    if (armatura.redactedId != "-1")
      cur = armatura.allArmatura[armatura.redactedId];
    else
      cur = {
        type: "",
        thick: "",
        length: "",
        count: ""
      }
    
    return <div>
      Тип <input type='text' defaultValue={cur.type} ref={this.rType}></input><br/>
      Толщина <input type='text' defaultValue={cur.thick} ref={this.rThick}></input><br/>
      Длина <input type='text' defaultValue={cur.length} ref={this.rLength}></input><br/>
      Кол-во <input type='text' defaultValue={cur.count} ref={this.rCount}></input><br/>
      <input type='button' value='Отмена' onClick={this._cancel} />
      <input type='button' value='Сохранить' onClick={this._save} />
    </div>
  }
}

export default connect(
  state => ({
    user: state.user,
    armatura: state.armatura
  }),
  dispatch => ({
    showRedactor: (show) => {
      dispatch({type: 'SHOW_ARMATURA_REDACTOR', payload: show})
    },
    setArmatura: (data) =>{
      dispatch({type: "SET_ARMATURA", payload: data})
    },
    setRedactedID: (data) =>{
      dispatch({type: "REDACTED_ID", payload: data})
    }
  }),
)(ArmaturaRedactor);