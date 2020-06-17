import {connect} from 'react-redux';
import css from './enter.module.css';

class EnterForm extends React.Component{
  constructor(props){
    super(props);
  }
  
  _close(){
    this.props.showEnter(false);
  }

  _enter(){
    
    var enter = {
      login: this.login.value,
      password: this.password.value
    };
  
    $.ajax({
        method: "POST",
        url: window.BackEndURL+"enter",
        data: JSON.stringify(enter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (answer)=>{
            if (answer.success===0)
              alert(answer.message);
            
            this.props.onLogin(true);
            localStorage.setItem("userLogin",true);
            localStorage.setItem("Token",answer.token);          
        }
    });
  }

  render(){
    if (this.props.forms.EnterForm)
      return <div className={css.EnterBlock}>
        <form className={css.EnterForm}>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Логин</span>
          </div>
          <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  ref={(node)=>{this.login = node;}}/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Пароль</span>
          </div>
          <input type="password" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  ref={(node)=>{this.password = node;}}/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <button type="button" className="btn btn-success" onClick={this._enter.bind(this)}>Войти</button>
          <button type="button" className="btn btn-warning" onClick={this._close.bind(this)}>Отмена</button>
        </div>
        </form>
      </div>
    else
      return <div></div>
  }
}

export default connect(
  state => ({
    user: state.user,
    forms: state.forms
  }),
  dispatch => ({
    onLogin: (loginState) => {
      dispatch({type: 'USER_LOGIN', payload: loginState})
    },
    showEnter: (visible) =>{
      dispatch({type: 'SHOW_ENTER', payload: visible})      
    }
  })
)(EnterForm);