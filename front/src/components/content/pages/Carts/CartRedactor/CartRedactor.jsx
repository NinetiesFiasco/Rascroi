import {connect} from 'react-redux';
import s from './CartRedactor.module.css';

class CartRedactor extends React.Component{
  constructor(props){
    super(props);
    this._save = this._save.bind(this);
    this._cancel = this._cancel.bind(this);
    this.rName = React.createRef();
    this.rComment = React.createRef();
    this._get = this._get.bind(this);
  }

  _save(){
    let carts = this.props.carts;
    let url,method;
    if (carts.redactedId != "-1"){
      let cur = carts.allCarts[carts.redactedId];
      url = window.BackEndURL+"orders/update/"+cur._id;
      method = "PUT";
    }
    else{
      url = window.BackEndURL+"orders/add";
      method = "POST";
    }
    
    let postObject = {
      name: this.rName.current.value,
      comment: this.rComment.current.value
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
    $.ajax({
      method: "GET",
      url: window.BackEndURL+"orders/getAll",
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
          this.props.setData(answer.data);
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
    console.log('CR_props',this.props);
    if (this.props.carts.allCarts == null)
      return <div>Нет данных</div>;
    
    let carts = this.props.carts;
    let cur;
    if (carts.redactedId != "-1")
      cur = carts.allCarts[carts.redactedId];
    else
      cur = {
        name: "",
        comment: ""
      }
    
    return <div>
      Название <input type='text' defaultValue={cur.name} ref={this.rName}></input><br/>
      Комментарий <input type='text' defaultValue={cur.comment} ref={this.rComment}></input><br/>
      <input type='button' value='Отмена' onClick={this._cancel} />
      <input type='button' value='Сохранить' onClick={this._save} />
    </div>
  }
}

export default connect(
  state => ({
    user: state.user,
    carts: state.carts
  }),
  dispatch => ({
    showRedactor: (show) => {
      dispatch({type: 'SHOW_REDACTOR', payload: show})
    },
    setData: (data) =>{
      dispatch({type: 'SET_DATA', payload: data})      
    },
    setRedactedID: (data) =>{
      dispatch({type: "REDACTED_ID", payload: data})
    }
  }),
)(CartRedactor);