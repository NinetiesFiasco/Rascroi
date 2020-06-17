import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import ArmaturaRedactor from './ArmaturaRedactor/ArmaturaRedactor';
import s from './Armatura.module.css';

class Armatura extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      carts: null,
      error: null,
      redactor: false,
    }
    this._get = this._get.bind(this);
    this.renderRedactor = this.renderRedactor.bind(this);
    this._redact = this._redact.bind(this);
    this._get();
  }

  _get(){
    let parts = window.location.href.split('/');
    let cartId = parts[parts.length-1];
    let that = this;
    $.ajax({
      method: "GET",
      url: window.BackEndURL+"orders/armatura/getByCart/"+cartId,
      headers: {
        "Authorization": localStorage.getItem("Token")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (answer)=>{
        if (answer.success === 0){
          //this.setState({error: answer.message});
        }
        else if (answer.success === 1){
          that.props.setArmatura(answer.data);
          //this.props.setState({error:null});
        }
      },
      error: (err)=>{
        console.log('error',err);
      }
    });
  }

  _redact(e){
    this.props.showRedactor(true);
    this.props.setRedactedID(e.target.getAttribute('data-key'))
  }

  render(){
    if (!this.props.user.login)
      return <div>Вы не авторизованы</div>
      
    return <div>
        <div></div>
        {this.renderTable()}
        {this.renderRedactor()}
      </div>;
  }   

  renderTable(){
    console.log('Arm_props',this.props);

    let parts = window.location.href.split('/');
    let cartId = parts[parts.length-1];

    if (this.props.armatura.allArmatura == null){
      if (this.state.error != null)
        return <div>{this.state.error}</div>
      else
        return <div>Заказов нет</div>
    }
    else
      return (
<div>
  <table className={s.armatura}>
    <thead>
      <tr>
        <th>Тип</th>
        <th>Толщина</th>
        <th>Длина</th>
        <th>Кол-во</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      {this.props.armatura.allArmatura.map((arm,key)=>{
        return <tr key={key}>
          <td>{arm.type}</td>
          <td>{arm.thick}</td>
          <td>{arm.length}</td>
          <td>{arm.count}</td>
          <td>
            <input type='button' value='Редактировать' data-key={key} onClick={this._redact} />
          </td>            
        </tr>
      })}
    </tbody>
  </table>
  <button data-key="-1" onClick={this._redact}>Добавить новый</button>
  <NavLink to={`/rascroi/${cartId}`}>Раскрой</NavLink>
</div>)
  }
  renderRedactor(){
    console.log('props',this.props)
    if (this.props.armatura.redactor)
      return <ArmaturaRedactor />;
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
  })
)(Armatura);