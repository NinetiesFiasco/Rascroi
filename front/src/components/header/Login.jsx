import {connect} from 'react-redux';

import EnterForm from '../forms/enter';

class Login extends React.Component{

  constructor(props){
    super(props);
  }
  _enter(){
    this.props.showEnter(true);
  }
  _logout(){
    this.props.onLogin(false);
    localStorage.setItem("userLogin",false)
  }

  componentDidMount(){
    this.props.onLogin(localStorage.getItem("userLogin"));
  }

  render(){
    if (this.props.user.login){
      return (
          <button onClick={this._logout.bind(this)} type="button" className="btn btn-info">Выйти</button>
      )
    }else{
      return (<div>
          <button type="button" className="btn btn-primary" onClick={this._enter.bind(this)}>Войти</button>
          <EnterForm />
        </div>
      )
    }
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
)(Login);