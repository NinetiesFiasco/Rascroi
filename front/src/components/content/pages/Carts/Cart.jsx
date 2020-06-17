import {connect} from 'react-redux';
import CartRedactor from './CartRedactor/CartRedactor';
import {NavLink} from 'react-router-dom';
import s from './Cart.module.css';

class Cart extends React.Component{

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

  _redact(e){   
    this.props.showRedactor(true);
    this.props.setRedactedID(e.target.getAttribute('data-key'))
  }

  render(){
    if (!this.props.user.login)
      return <div>Вы не авторизованы</div>
      
    return <div>
        <div>Заказы</div>
        {this.renderTable()}
        {this.renderRedactor()}
      </div>;
  }   

  renderTable(){
    console.log('C_props',this.props);
    if (this.props.carts.allCarts == null){
      if (this.state.error != null)
        return <div>{this.state.error}</div>
      else
        return <div>Заказов нет</div>
    }
    else
      return <div><table><tbody>
        {this.props.carts.allCarts.map((cart,key)=>{
          return <tr key={key}>
            <td>{cart.name}</td>
            <td>{cart.comment}</td>
            <td>
              <input type='button' value='Редактировать' data-key={key} onClick={this._redact} />
            </td>
            <td>
                <NavLink to={`armatura/${cart._id}`} key={key}>Перейти</NavLink>
            </td>            
          </tr>
        })}
      </tbody></table>
      <input type='button' value='Добавить новую' data-key="-1" onClick={this._redact} />
      </div>
  }
  renderRedactor(){
    console.log('props',this.props)
    if (this.props.carts.redactor)
      return <CartRedactor />;
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
      dispatch({type: "SET_DATA", payload: data})
    },
    setRedactedID: (data) =>{
      dispatch({type: "REDACTED_ID", payload: data})
    }
  })
)(Cart);